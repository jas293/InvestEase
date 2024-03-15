from flask import Flask, request, jsonify, session, redirect, make_response
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from models import User, User1, Answers
import secrets
import os
import jwt
from dotenv import load_dotenv, dotenv_values # For loading environment variables
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

'''
Generating a key which will be used as a session cookie, so when the user logsin,
this secret key will be used to assign a session cookie 
'''
secret_key = secrets.token_urlsafe(32)


app = Flask(__name__)

'''
Web browsers prevent unauthorized access to resources on a different origin(domain, protocol, or port)
CORS support_credentials will help to connect and fetch data from front-end to backend
'''
CORS(app, supports_credentials=True)

# Set the secret key for the Flask app
app.secret_key = secret_key

# Load environment variables from a .env file
load_dotenv()

# # Initialize Flask-Session and set the session type to use filesystem
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_NAME'] = 'session_cookie'  # Set the custom session cookie name
Session(app)

# Initialize Bcrypt for password hashing
bcrypt = Bcrypt(app)
server_session = Session(app)
#bcrypt = Bcrypt()

app.config["JWT_SECRET"] = secret_key

# Connect to the MongoDB database using the URI from the environment variables
client = MongoClient(os.getenv("ATLAS_URI"))

# Connect to the 'db1' database
db = client.db1

# Access the 'userInfo' collection in the 'db1' database
collection = db.userInfo

# Route to get the current user's information such as ID and Email
@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    # Check if the user is authenticated
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
   
    # Find user data in the MongoDB collection
    user_data = collection.find_one({"_id": user_id})

    # If user data is not found, return an error
    if not user_data:
        return jsonify({"error": "User not found"}), 404


    return jsonify({"id": user_data["_id"], "email": user_data["email"]})


# Route to register a new user
@app.route("/register" , methods = ["POST"])
def register():
    # Get user details from the request JSON
    email = request.json["email"]
    password = request.json["password"]
    dob = request.json["dob"]
    phone = request.json["phone"]


    # Check if the user already exists in db
    user_exists = collection.find_one({"email": email}) is not None

    #If user doesn't exist, it will throw an error
    if user_exists:
        return jsonify({"error": "User already exists"}) , 409

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password)
    print(hashed_password)
    print(type(hashed_password))
    # Assuming hashed_password is a byte string
    hashed_password_str = hashed_password.decode('utf-8')
    print(hashed_password_str)

    # Create a new user object, using User1 which is defined in models.py
    new_user = User1(email=email , password=hashed_password_str, dob=dob, phone=phone)

    # Insert the new user into the MongoDB collection
    insert_result = collection.insert_one(new_user.to_dict())

    # Get the inserted user's id
    user_id = insert_result.inserted_id

    # Set the user's ID in the session
    session["user_id"] = user_id

    # Return user details
    return({"id":new_user.id , "email": new_user.email, "dob":new_user.dob, "phone":new_user.phone})

# Route to login a user
@app.route("/login" , methods = ["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]


    # Find user data in db based on the provided email
    user_data = collection.find_one({"email": email})

    #if the data doesn't exist which means, it is not registered and will throw an error
    if user_data is None:
        return jsonify({"error": "Unauthorized"}) , 401
    
    # Create a user object
    user = User(email=user_data["email"], password=user_data["password"])

    # Check if the provided password matches the hashed password in the database
    '''
    if not bcrypt.check_password_hash(user.password , password):
        return jsonify({"error": "Unauthorized"}) , 401
    '''

    hashed_password = user_data["password"]
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    # Set the user's ID in the session
    session["user_id"] = user_data["_id"]

    # Return user details
    return ({"id": user_data["_id"], "email": user_data["email"]})

# Route to log out a user
@app.route("/logout" , methods=["POST"])
def logout_user():
    # Remove user ID from the session, it will remove the session cookies
    session.pop("user_id")
    return "200"

@app.route("/forget-password", methods=["POST"])
def forget_password():
    # Extract email from the request JSON
    email = request.json["email"]
    try:
        # Check if user exists in the database
        user_exist = collection.find_one({"email": email})

        if not user_exist:
            # If user does not exist, return 404 status with message
            return jsonify({"status": "User not exist"}), 404
        
        # Generate JWT token for resetting password
        secret = app.config["JWT_SECRET"] + user_exist["password"]
        token = jwt.encode({"email": user_exist['email'], "id": str(user_exist['_id'])}, secret, algorithm="HS256")

        # Construct reset password link
        link = f'http://localhost:5000/reset-password/{str(user_exist["_id"])}/{token}'
        print(link) # Print the link for debugging
        #return jsonify({"link": link})
    
        # Email Sending Logic
        sender_email = "pritpatel7311@gmail.com"  # Your email address
        receiver_email = email  # Receiver's email address
        password = "rymf oxvu njfc zqbi"  # Your email password

        # Create message container
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = "Reset Password Link"

        # Body of the email
        body = f"Click the following link to reset your password: {link}"
        msg.attach(MIMEText(body, 'plain'))

        # Connect to SMTP server and send email
        server = smtplib.SMTP('smtp.gmail.com', 587)  # Change SMTP server and port accordingly
        server.starttls()
        server.login(sender_email, password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()

        # Return success message
        return jsonify({"status": "Reset password link sent to your email"})
    except Exception as e:
        print(e) # Print any exception occurred for debugging
        return "Error occurred" # Return generic error message
        
@app.route("/reset-password/<id>/<token>", methods=["GET"])
def reset_password(id, token):

    try:
        # Check if the user ID exists in the database
        user_exist = collection.find_one({"_id": id})
        if not user_exist:
            # If user does not exist, return 404 status with message
            return jsonify({"message": "User not exists"}), 404
       
        # Decode JWT token
        secret = app.config["JWT_SECRET"] + user_exist["password"]
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        print(payload) # Print decoded token payload for debugging
       
        # Compare decoded token payload with expected user information
        if payload["id"] == str(user_exist["_id"]) and payload["email"] == user_exist["email"]:
            # If token payload matches expected user information, redirect to reset password page
            return redirect("http://localhost:5173/ResetPassword?id="  + str(user_exist["_id"]) + "&token=" + token + "&status=not_verified" + user_exist["email"], code=302)
            #return jsonify({"message": "verified"})
        else:
            # If token payload does not match expected user information, return 401 Unauthorized status
            return jsonify({"message": "Not verified"}), 401
       
    except jwt.ExpiredSignatureError:
        # Handle expired token error
        return jsonify({"error": "Token expired"}), 400
    except jwt.InvalidTokenError:
        # Handle invalid token error
        return jsonify({"error": "Invalid token"}), 400
    except Exception as e:
        # Handle any other exceptions
        print(e) # Print exception for debugging
        return jsonify({"error": str(e)}), 500 # Return error response with the details of the exception

@app.route("/reset-Password", methods=["POST"])
def reset():
    # Get user_id, token, and new password from the request JSON
    user_id = request.json.get("id")
    token = request.json.get("token")
    password = request.json.get("password")

    # Print received data for debugging
    print("User ID:", user_id)
    print("Token:", token)
    print("New Password:", password)

    # Check if the user with the provided user_id exists in the database
    old_user = collection.find_one({"_id": user_id})
    if not old_user:
        print("User not exist")
        return jsonify({"status": "User not Exist"})
    # Print debug message if user exists
    print("User exist")
    
    # Generate secret for JWT decoding
    secret = app.config["JWT_SECRET"] + old_user["password"]
    print("secret" , secret)
    #return jsonify({"id": user_id, "token": token})
    
    try:
        # Decode the JWT token
        jwt.decode(token, secret, algorithms=["HS256"])
        print("Token decoded successfully")
        
        #encrypted_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        # Hash the new password using bcrypt
        hashed_password = bcrypt.generate_password_hash(password)
        print(hashed_password)
        print(type(hashed_password))

        # Assuming hashed_password is a byte string, convert it to a string
        hashed_password_str = hashed_password.decode('utf-8')
        print(hashed_password_str) #Printing it for decodding 
        
        # Update the user's password in the database
        collection.update_one(
            {"_id": user_id},
            {"$set": {"password": hashed_password_str}}
        )
        print("Password Updated") #Printing the message for decodding 
        return jsonify({"status": "Password updated"})
    except jwt.ExpiredSignatureError:
        # Handle expired token error
        return jsonify({"status": "Token has expired"})
    except jwt.InvalidSignatureError:
        # Handle invalid token signature error
        return jsonify({"status": "Invalid token signature"})
    except Exception as e:
        # Handle any other exceptions
        return jsonify({"status": "Something went wrong", "error": str(e)})
    
#Route to handle questionnaire subssions
@app.route("/questionnaire" , methods=["POST"])
def submit_questionnaire():
    #Receving answers from front-end
    answer1 = request.json.get("answer1")
    answer2 = request.json.get("answer2")
    answer3 = request.json.get("answer3")
    answer4 = request.json.get("answer4")
    
    #checking answers if any of them are null
    if not (answer1 and answer2 and answer3 and answer4):
        return jsonify({"error": "All answers are required"}), 400
    
    #Retriving user's ID from database
    user_id = session.get("user_id")
    
    #Throws an error if fails to retrive the user_id
    if not user_id:
        return jsonify({"error":"Unauthorized"}), 401
    
    try:
        
        # Find user data in the MongoDB collection using user ID
        user_data = collection.find_one({"_id": user_id})

        #if the user is not found in DB, it will throw an error
        if not user_data:
            return jsonify({"error": "User not found"}), 404
    
        # Get the email of the logged-in user
        email = user_data["email"]

        if not email:
            # If email is not found, add email to the user
            collection.update_one(
                {"_id": user_id},
                {"$set": {"email": email}}
            )
    
        # Print the user's email; for decoding purpose
        print("User's Email:", email)
        
         # Check if answers already exist for the user
        if user_data.get("answer1") is not None:
            # Update existing answers
            collection.update_one(
                {"_id": user_id},
                {"$set": {
                    "answer1": answer1,
                    "answer2": answer2,
                    "answer3": answer3,
                    "answer4": answer4
                }}
            )
            return jsonify({"status": "Questionnaire answers updated successfully"}), 200
        else:
            # Update registration data with answers
            collection.update_one(
                {"_id": user_id},
                {"$set": {
                    "answer1": answer1,
                    "answer2": answer2,
                    "answer3": answer3,
                    "answer4": answer4,
                    "email": email  # Ensure email is included
                }}
            )
            return jsonify({"status": "Questionnaire answers submitted successfully"}), 200
    except Exception as e:
        return jsonify({"error":str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)

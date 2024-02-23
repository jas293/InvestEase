from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from models import User, User1
import secrets
import os
from dotenv import load_dotenv, dotenv_values # For loading environment variables
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
Session(app)

# Initialize Bcrypt for password hashing
bcrypt = Bcrypt(app)
server_session = Session(app)

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

    # Create a new user object, using User1 which is defined in models.py
    new_user = User1(email=email , password=hashed_password, dob=dob, phone=phone)

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
    if not bcrypt.check_password_hash(user.password , password):
        return jsonify({"error": "Unauthorized"}) , 401
    
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

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)

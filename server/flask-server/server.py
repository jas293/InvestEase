from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from pymongo import MongoClient
from models import db, User, User1
import secrets
import os
from dotenv import load_dotenv, dotenv_values


secret_key = secrets.token_urlsafe(32)


app = Flask(__name__)

CORS(app, supports_credentials=True)
app.secret_key = secret_key

load_dotenv()


# Initialize Flask-Session
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


bcrypt = Bcrypt(app)
server_session = Session(app)
#client = MongoClient("mongodb+srv://pdp5:patel@cluster0.h1ybggt.mongodb.net/?retryWrites=true&w=majority")  # Update the connection string with your MongoDB URI

client = MongoClient(os.getenv("ATLAS_URI"))


db = client.db1


collection = db.userInfo


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")


    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
   
    user_data = collection.find_one({"_id": user_id})


    if not user_data:
        return jsonify({"error": "User not found"}), 404


    return jsonify({"id": user_data["_id"], "email": user_data["email"]})




@app.route("/register" , methods = ["POST"])
def register():
    email = request.json["email"]
    password = request.json["password"]
    dob = request.json["dob"]
    phone = request.json["phone"]


    # Now, you can perform the query to check if a user with a specific email exists
    user_exists = collection.find_one({"email": email}) is not None


    if user_exists:
        return jsonify({"error": "User already exists"}) , 409


    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User1(email=email , password=hashed_password, dob=dob, phone=phone)


    # Insert the document into the 'users' collection
    # Insert the document into the 'users' collection
    insert_result = collection.insert_one(new_user.to_dict())

    # Get the inserted document's id
    user_id = insert_result.inserted_id

    session["user_id"] = user_id



    return({"id":new_user.id , "email": new_user.email, "dob":new_user.dob, "phone":new_user.phone})


@app.route("/login" , methods = ["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]


    # Now, you can perform the query to check if a user with a specific email exists
    user_data = collection.find_one({"email": email})


    if user_data is None:
        return jsonify({"error": "Unauthorized"}) , 401
   
    user = User(email=user_data["email"], password=user_data["password"])


    if not bcrypt.check_password_hash(user.password , password):
        return jsonify({"error": "Unauthorized"}) , 401
   
    session["user_id"] = user_data["_id"]


    return ({"id": user_data["_id"], "email": user_data["email"]})

@app.route("/logout" , methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True)

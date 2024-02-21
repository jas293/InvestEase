from pymongo import MongoClient
from uuid import uuid4


# Connect to MongoDB
client = MongoClient("mongodb+srv://pdp5:patel@cluster0.h1ybggt.mongodb.net/?retryWrites=true&w=majority")  # Update the connection string with your MongoDB URI
db = client["db1"]  # Replace "your_database_name" with your MongoDB database name


# Function to generate UUID
def get_uuid():
    return uuid4().hex


# Define MongoDB collection
collection = db["userInfo"]


class User:
    def __init__(self, email, password):
        self.id = get_uuid()
        self.email = email
        self.password = password




    def to_dict(self):
        return {
            "_id": self.id,
            "email": self.email,
            "password": self.password
        }


class User1:
    def __init__(self, email, password, dob, phone):
        self.id = get_uuid()
        self.email = email
        self.password = password
        self.dob = dob
        self.phone = phone






    def to_dict(self):
        return {
            "_id": self.id,
            "email": self.email,
            "password": self.password,
            "dob": self.dob,
            "phone": self.phone
        }

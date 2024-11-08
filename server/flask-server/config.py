'''
Importing load_dotenv function to load environment variables from .env file
Importing os module for interacting with the operating system
Importing the redis module for working with Redis databases, which helps in storing
session data on server's filesystem
'''
from dotenv import load_dotenv
import os
import redis

# Load environment variables from the .env file into the current environment
load_dotenv()

# Class defining application configuration settings
class ApplicationConfig:
    # Setting the SECRET_KEY attribute to the value of the SECRET_KEY environment variable
    SECRET_KEY = os.environ["SECRET_KEY"]
    # Setting the MONGO_URI attribute to the value of the MONGO_URI environment variable
    MONGO_URI = os.environ["MONGO_URI"]

    # Configuring Flask-Session to use Redis as the session storage mechanism
    SESSION_TYPE = "redis" # Setting the session type to use Redis
    SESSION_PERMANENT = False # Setting whether sessions are permanent (not used here)
    SESSION_USE_SIGNER = True # Setting whether to use a signer for the session cookie
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379") # Connecting to a local Redis server
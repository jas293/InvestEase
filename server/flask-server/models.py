# Importing uuid4 function for generating UUIDs
from uuid import uuid4


# Function to generate UUID, which will be assigned to each authenticated user 
def get_uuid():
    return uuid4().hex


#The User class is defined to use for saving and fetching user's login data to the db 
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

#The User1 class is defined to use for saving and fetching user's signup data to the db 
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
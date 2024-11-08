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
    
class Answers:
    def __init__(self,email, answer1, answer2, answer3,answer4, answer5, answer6, answer7, answer8, answer9,answer10,answer11,answer12,answer13,answer14,answer15):
        
        self.email = email
        self.answer1 = answer1
        self.answer2 = answer2
        self.answer3 = answer3
        self.answer4 = answer4
        self.answer5 = answer5
        self.answer6 = answer6
        self.answer7 = answer7
        self.answer8 = answer8
        self.answer9 = answer9
        self.answer10 = answer10
        self.answer11 = answer11
        self.answer12 = answer12
        self.answer13 = answer13
        self.answer14 = answer14
        self.answer15 = answer15
        
        
    
    def to_dict(self):
        return{
            "email": self.email,
            "answer1": self.answer1,
            "answer2": self.answer2,
            "answer3": self.answer3,
            "answer4": self.answer4,
            "answer5": self.answer5,
            "answer6": self.answer6,
            "answer7": self.answer7,
            "answer8": self.answer8,
            "answer9": self.answer9,
            "answer10": self.answer10,
            "answer11": self.answer11,
            "answer12": self.answer12,
            "answer13": self.answer13,
            "answer14": self.answer14,
            "answer15": self.answer15
        }

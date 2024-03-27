import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier  # Import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1. Data Simulation
def simulate_data(n_samples=1000, n_questions=16):
    np.random.seed(42)  # For reproducibility
    # Simulate answers (0: A, 1: B, 2: C, 3: D)
    answers = np.random.randint(0, 4, size=(n_samples, n_questions))
    # Simulate risk categories based on answers
    categories = []
    for answer_set in answers:
        avg_answer = np.mean(answer_set)
        if avg_answer <= 1:
            categories.append('Conservative')
        elif avg_answer <= 2:
            categories.append('Moderate')
        else:
            categories.append('Aggressive')
    return answers, np.array(categories)

X, y = simulate_data()

# 2. Feature Engineering
def feature_engineering(data):
    features = pd.DataFrame(data)
    # Adding custom features
    features['avg_response'] = features.mean(axis=1)
    features['high_risk_responses'] = (features >= 2).sum(axis=1)
    # Convert all column names to string to avoid the TypeError
    features.columns = features.columns.astype(str)
    return features

X_fe = feature_engineering(X)

# 3. Model Training with KNN
X_train, X_test, y_train, y_test = train_test_split(X_fe, y, test_size=0.2, random_state=42)
model = KNeighborsClassifier(n_neighbors=5)  # Initialize KNN with 5 neighbors
model.fit(X_train, y_train)

# 4. Prediction and Accuracy Evaluation
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")
print(classification_report(y_test, y_pred))

# 5. Making Predictions for User Input
def predict_user_risk_category(user_answers):
    # Assume user_answers is a list of 16 integers [0, 1, 2, 3]
    user_features = feature_engineering(np.array(user_answers).reshape(1, -1))
    user_risk_category = model.predict(user_features)
    return user_risk_category[0]

# Example User Input (Replace this with actual user input)
user_answers = np.random.randint(0, 4, 16)  # Simulating user input
predicted_risk_category = predict_user_risk_category(user_answers)
print(f"User's Predicted Risk Category: {predicted_risk_category}")

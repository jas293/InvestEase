import plotly.graph_objects as go

def assess_risk_tolerance(answers):
  """
  Assesses an investor's risk tolerance based on their answers to a questionnaire.
  
  """

  # Define question categories and answer mappings to scores
  categories = {
    "investment_horizon": {
      "A": -20,  # Less than 1 year (lower tolerance)
      "B": -10,  # 1 to 3 years
      "C": 0,   # 4 to 7 years
      "D": 10    # More than 7 years (higher tolerance)
    },
    "comfort_with_fluctuations": {
      "A": -20,  # Very uncomfortable (lower tolerance)
      "B": -10,
      "C": 0,
      "D": 20   # Comfortable with significant fluctuations (higher tolerance)
    },
    "financial_situation": {
      "A": -20,  # Limited savings and significant debt (lower tolerance)
      "B": -10,
      "C": 0,
      "D": 10    # Substantial savings and financial security (higher tolerance)
    },
    "approach_to_financial_decisions": {
      "A": -20,  # Prioritizes safety (lower tolerance)
      "B": 0,
      "C": 10,
      "D": 20   # Comfortable with significant risk (higher tolerance)
    },
    "investment_knowledge": {
      "A": -20,  # Not familiar (lower tolerance)
      "B": -10,
      "C": 0,
      "D": 10    # Strong understanding (higher tolerance)
    },
    "reaction_to_past_losses": {
      "A": -20,  # Anxious and sold investments (lower tolerance)
      "B": -10,
      "C": 0,
      "D": 20   # Viewed it as a buying opportunity (higher tolerance)
    },
    "reliance_on_professional_advice": {
      "A": -20,  # Relies heavily (lower tolerance)
      "B": -10,
      "C": 0,
      "D": 10    # Primarily relies on self-research (higher tolerance)
    },
    "investment_scenario_preference": {
      "A": -20,  # Consistent, predictable returns (lower tolerance)
      "B": -10,
      "C": 0,
      "D": 20   # High potential returns with high risk (higher tolerance)
    },
    "financial_legacy": {
      "A": 0,
      "B": 10,   # Moderately important (potentially higher tolerance)
      "C": 20,   # Major priority (potentially higher tolerance)
    },
    "short_term_loss_response": {
      "A": -20,  # Extremely worried and considered selling (lower tolerance)
      "B": -10,
      "C": 0,
      "D": 20   # Viewed it as a potential buying opportunity (higher tolerance)
    },
    "following_financial_news": {
      "A": -10,  # Not interested (potentially lower tolerance)
      "B": 0,
      "C": 10,
      "D": 20    # Actively researches and analyzes (potentially higher tolerance)
    },
    "investment_allocation": {
      "A": -30,  # All in low-risk savings (lower tolerance)
      "B": -20,  # Equal in low-risk and moderate-risk
      "C": -10,  # Majority in high-risk growth stock fund
      "D": 20    # All in high-risk, high-reward investment (higher tolerance)
    },
    "personality_description": {
      "A": -20,  # Very cautious (lower tolerance)
      "B": -10,
      "C": 10,
      "D": 20   # Adventurous and willing to take significant risks (higher tolerance)
    },
    "investment_philosophy": {
      "A": -20,  # Preserve capital (lower tolerance)
      "B": 0,   # Balanced approach (moderate tolerance)
      "C": 20,   # Maximize potential returns with risk (higher tolerance)
      "D": 30    # Achieve financial goals quickly with substantial risk (highest tolerance)
    }
  }

# Calculate total score based on answer choices within categories
  total_score = 0
  for question, answer in answers.items():
      if question in categories:
        total_score += categories[question][answer]

# Interpret the total score and return risk tolerance level
  if total_score <= -60:
    return "Low Risk Tolerance"
  elif total_score <= 60:
    return "Medium Risk Tolerance"
  else:
    return "High Risk Tolerance"

# Example usage
answers = {
  1: "C",  # Investment horizon: 4 to 7 years
  2: "B",  # Comfort with fluctuations: Somewhat uncomfortable
  3: "C",  # Financial situation: Comfortable savings cushion
  4: "C",  # Approach to financial decisions: Moderate risk tolerance
  5: "C",  # Investment knowledge: Moderate understanding
  6: "C",  # Reaction to past losses: Neutral
  7: "C",  # Reliance on professional advice: Moderate reliance
  8: "C",  # Investment scenario preference: Moderate potential returns with moderate risk
  9: "B",  # Financial legacy: Moderately important
  10: "C", # Short-term loss response: Neutral
  11: "C", # Following financial news: Moderate interest
  12: "C", # Investment allocation: Majority in high-risk growth stock fund
  13: "C", # Personality description: Balanced
  14: "C"  # Investment philosophy: Balanced approach
}

# Add a python diagram to show the result of the assessment of the risk tolerance of the investor based on the answers to the questionnaire out of 100 points.
# The result should be a pie chart showing the percentage of the risk tolerance of the investor.
# Define the data
labels = ["Low Risk Tolerance", "Medium Risk Tolerance", "High Risk Tolerance"]
values = [33, 66, 100]  # Map each risk tolerance level to a value out of 100

# Assume this is the user's risk tolerance level
user_risk_tolerance = "Medium Risk Tolerance"

# Find the index of the user's risk tolerance
user_index = labels.index(user_risk_tolerance)

fig = go.Figure(go.Indicator(
    mode = "gauge+number",
    value = values[user_index],
    domain = {'x': [0, 1], 'y': [0, 1]},
    title = {'text': "Investor Risk Tolerance", 'font': {'size': 24, 'color': "darkblue"}},
    gauge = {
        'axis': {'range': [None, 100], 'tickwidth': 1, 'tickcolor': "darkblue"},
        'bar': {'color': "darkblue"},
        'bgcolor': "white",
        'borderwidth': 2,
        'bordercolor': "gray",
        'steps': [
            {'range': [0, 33], 'color': 'lightblue'},
            {'range': [33, 66], 'color': 'skyblue'},
            {'range': [66, 100], 'color': 'steelblue'},
        ],
        'threshold': {
            'line': {'color': "red", 'width': 4},
            'thickness': 0.75,
            'value': values[user_index]
        }
    }
))

fig.update_layout(paper_bgcolor = "white", font = {'color': "darkblue", 'family': "Arial"})

fig.show()


risk_tolerance = assess_risk_tolerance(answers)
print(f"Your risk tolerance is: {risk_tolerance}")


def low_risk(budget):
  symbols = ["AGG", "BND", "SPY", "VOO", "VTI", "VXUS", "BNDX", "GLD", "VNQ", "VIG"]
  allocation = [0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05]
  amounts = [budget * a for a in allocation]
  for symbol, amount in zip(symbols, amounts):
    print(f"Buy ${amount:.2f} of {symbol}")

def medium_risk(budget):
    symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "V", "JPM", "JNJ", "UNH", "PG"]
    allocation = [0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05]
    amounts = [budget * a for a in allocation]
    for symbol, amount in zip(symbols, amounts):
        print(f"Buy ${amount:.2f} of {symbol}")

def high_risk(budget):
    symbols = ["XENE", "IOVA", "KRTX", "AUR", "AVDL", "INBX", "ENVX", "GERN", "RLAY", "VRNA"]
    allocation = [0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05]
    amounts = [budget * a for a in allocation]
    for symbol, amount in zip(symbols, amounts):
        print(f"Buy ${amount:.2f} of {symbol}")


risk_level = 'high'
budget = 1000

if risk_level == 'low':
    low_risk(budget)
elif risk_level == 'medium':
    medium_risk(budget)
elif risk_level == 'high':
    high_risk(budget)
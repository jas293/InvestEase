import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
import plotly.graph_objects as go
import pymongo as pm

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

# Get the user's answers to the questionnaire from the mongoDB database.
# Connect to the MongoDB database
client = pm.MongoClient("mongodb://localhost:27017/")
db = client["risk_analysis"]
collection = db["questionnaire"]

# Get the user's answers to the questionnaire
answers = collection.find_one({})
print(answers)

# Assess the risk tolerance based on the user's answers
risk_tolerance = assess_risk_tolerance(answers)
print(f"Your risk tolerance is: {risk_tolerance}")


# Add a python diagram to show the result of the assessment of the risk tolerance of the investor based on the answers to the questionnaire out of 100 points.
# The result should be a pie chart showing the percentage of the risk tolerance of the investor.
import plotly.graph_objects as go

# Define the data
labels = ["Low Risk Tolerance", "Medium Risk Tolerance", "High Risk Tolerance"]
values = [33, 66, 100]  # Map each risk tolerance level to a value out of 100

# Get the user's risk tolerance from the assessment function.
user_risk_tolerance = assess_risk_tolerance(answers)

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

fig.add_annotation(
  x=0.5,
  y=0.4,
  text=f"Your Risk Tolerance: {user_risk_tolerance}",
  showarrow=False,
  font={'size': 16, 'color': 'darkblue'}
)

fig.update_layout(paper_bgcolor = "white", font = {'color': "darkblue", 'family': "Arial"})
fig.show()

html_div = fig.to_html(full_html=False, include_plotlyjs='cdn')
print(html_div)

fig.update_layout(paper_bgcolor = "white", font = {'color': "darkblue", 'family': "Arial"})
fig.show()

html_div = fig.to_html(full_html=False, include_plotlyjs='cdn')
print(html_div)


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


risk_level = user_risk_tolerance
budget = 1000

if risk_level == 'Low Risk Tolerance':
    low_risk(budget)
elif risk_level == 'Medium Risk Tolerance':
    medium_risk(budget)
elif risk_level == 'High Risk Tolerance':
    high_risk(budget)




def get_stock_info(symbols, amounts):
    # Define the start and end dates for the 5-year period
    end = datetime.today().strftime('%Y-%m-%d')
    start = (datetime.today() - timedelta(days=5*365)).strftime('%Y-%m-%d')

    # Initialize a DataFrame to store the stock information
    df = pd.DataFrame(columns=['Symbol', 'Amount', 'Historical Return', 'Volatility', 'Price', '12 Month Yield'])

    # Get the stock information for each symbol
    for symbol, amount in zip(symbols, amounts):
        # Download the historical market data
        data = yf.download(symbol, start=start, end=end)

        # Calculate the historical return, volatility, and 12 month yield
        historical_return = (data['Close'][-1] - data['Close'][0]) / data['Close'][0]
        volatility = data['Close'].pct_change().std()
        price = data['Close'][-1]
        yield_12m = (data['Close'][-1] - data['Close'][-365]) / data['Close'][-365]

        # Create a DataFrame for the current symbol
        df_symbol = pd.DataFrame({'Symbol': [symbol], 'Amount': [amount], 'Historical Return': [historical_return], 'Volatility': [volatility], 'Price': [price], '12 Month Yield': [yield_12m]})

        # Add the stock information to the DataFrame
        df = pd.concat([df, df_symbol], ignore_index=True)

    # Return the DataFrame
    return df

# Define the budget and allocation
budget = 1000
allocation = [0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05]

# Get the stock information for the symbols based on the risk level
if risk_level == 'low':
    symbols = ["AGG", "BND", "SPY", "VOO", "VTI", "VXUS", "BNDX", "GLD", "VNQ", "VIG"]
elif risk_level == 'medium':
    symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "V", "JPM", "JNJ", "UNH", "PG"]
elif risk_level == 'high':
    symbols = ["XENE", "IOVA", "KRTX", "AUR", "AVDL", "INBX", "ENVX", "GERN", "RLAY", "VRNA"]

# Calculate the amounts for each symbol
amounts = [budget * a for a in allocation]

df = get_stock_info(symbols, amounts)

# Convert the DataFrame to HTML
html = df.to_html()

# Write the HTML to a file
with open('stock_info.html', 'w') as f:
    f.write(html)


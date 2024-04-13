import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
import plotly.graph_objects as go
import pymongo
from pymongo import MongoClient

# Setup MongoDB connection
client = MongoClient('mongodb://localhost:27017/')  # Modify as per actual MongoDB host and port
db = client['db1']                   # Use your actual database name
collection = db['userInfo']             # Use your actual collection name


def assess_risk_tolerance(answers):
  """
  Assesses an investor's risk tolerance based on their answers to a questionnaire.
  
  """
  categories = {
    'answer1': {
        "Less than 1 year": -20,
        "1 to 3 years": -10,
        "4 to 7 years": 0,
        "More than 7 years": 10
    },
    'answer2': {
        "I am very uncomfortable and would prefer to avoid any potential losses": -20,
        "I am somewhat uncomfortable but willing to accept some risk for potentially higher returns.": -10,
        "I am comfortable with moderate fluctuations and understand the potential for short-term losses.": 0,
        "I am comfortable with significant fluctuations and prioritize the potential for high returns, even if it means accepting higher risk": 20
    },
    'answer3': {
        "I have limited savings and significant debt": -20,
        "I have some savings and manageable debt": -10,
        "I have a comfortable savings cushion and no significant debt": 10,
        "I have a substantial amount of savings and financial security": 20
    },
    'answer4': {
        "I am risk-averse and prioritize financial security over higher returns": -20,
        "I prefer a balanced approach, considering both risk and potential reward": 0,
        "I am open to some risks for higher potential returns": 10,
        "I actively seek high risk opportunities for substantial returns": 20
    },
    'answer5': {
        "Not familiar at all with investment options": -20,
        "I have a basic understanding of some common investment options": -10,
        "I am fairly knowledgeable about various investment strategies": 10,
        "I consider myself an expert in financial markets and investments": 20
    },
    'answer6': {
        "Very uneasy and sold investments immediately": -20,
        "I felt uneasy but held onto my investments and waited for recovery": -10,
        "I maintained my investments and looked for buying opportunities": 10,
        "I viewed it as a major buying opportunity and invested more": 20
    },
    'answer7': {
        "Heavily relies on professional advice without personal input": -20,
        "Considers professional advice but has significant personal input": -10,
        "Primarily relies on self-research with occasional professional advice": 10,
        "Exclusively relies on self-research and makes independent decisions": 20
    },
    'answer8': {
        "Low growth potential with minimal fluctuations": -20,
        "Moderate growth potential with some possibility of fluctuations": -10,
        "High growth potential with considerable fluctuations": 10,
        "Very high growth potential with extreme fluctuations": 20
    },
    'answer9': {
        "Significant factor in investment decisions": -20,
        "Moderate factor in investment decisions": -10,
        "Minor factor in investment decisions": 10,
        "This is not a significant factor in my investment decisions": 20
    },
    'answer10': {
        "Extremely risk-averse": -20,
        "Somewhat risk-averse": -10,
        "Somewhat risk-tolerant": 10,
        "Highly risk-tolerant": 20
    },
    'answer11': {
        "Would panic and sell all investments": -20,
        "Would be cautious and monitor the market": -10,
        "Would hold investments and ride out the market": 10,
        "I would view it as a potential buying opportunity and consider adding to my investments": 20
    },
    'answer12': {
        "Does not follow financial news": -20,
        "Occasionally follows financial news": -10,
        "Regularly follows financial news": 10,
        "I actively research and analyze financial news and trends to make informed decisions": 20
    },
    'answer13': {
        "Invest in very low-risk, low-return options": -20,
        "Invest mostly in low-risk options with some growth potential": -10,
        "Balanced investment in growth and safety": 10,
        "Invest the majority in a high-risk growth stock fund, with a smaller portion in a low-risk bond fund": 20
    },
    'answer14': {
        "Impulsive and spontaneous in financial decisions": -20,
        "Cautious but sometimes spontaneous": -10,
        "Deliberate but flexible": 10,
        "I am deliberate and prefer to make calculated decisions based on research": 20
    },
    'answer15': {
        "Avoids financial risks completely": -20,
        "Prefers minimal financial risks": -10,
        "Open to calculated high risks for potential high returns": 10,
        "I am primarily driven by achieving financial goals quickly, even if it means taking substantial risks": 20
    }
}

# Calculate total score based on answer choices within categories
  total_score = 0
  for question, answer in answers.items():
    if question in categories and answer in categories[question]:
        total_score += categories[question][answer]

    # Interpret the total score and return risk tolerance level
  if total_score <= -60:
    return "Low Risk Tolerance"
  elif total_score <= 60:
    return "Medium Risk Tolerance"
  else:
    return "High Risk Tolerance"

# Function to fetch answers and process them
def fetch_and_process_answers():
    answers = collection.find()  # Fetch answers from MongoDB
    results = []
    for answer in answers:
        result = assess_risk_tolerance(answer)  # Assuming this function processes each answer
        results.append(result)
    return results

results = fetch_and_process_answers()
for result in results:
    print(result) 
    
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
  x=0.8,
  y=0.4,
  text=f"Your Risk Tolerance: {user_risk_tolerance}",
  showarrow=False,
  font={'size': 16, 'color': 'darkblue'}
)

fig.update_layout(paper_bgcolor = "white", font = {'color': "darkblue", 'family': "Arial"})

html_div = fig.to_html(full_html=False, include_plotlyjs='cdn')

fig.update_layout(paper_bgcolor = "white", font = {'color': "darkblue", 'family': "Arial"})

html_div = fig.to_html(full_html=False, include_plotlyjs='cdn')

risk_tolerance = assess_risk_tolerance(answers)



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
        df_symbol = pd.DataFrame({
            'Symbol': [symbol], 
            'Amount': [f'${amount}'],  # Add $ symbol
            'Historical Return': [f'{historical_return:.2f}%'],  # Add % symbol and format to 2 decimal places
            'Volatility': [f'{volatility:.4f}%'],  # Add % symbol and format to 4 decimal places
            'Price': [f'${price:.2f}'],  # Add $ symbol and format to 2 decimal places
            '12 Month Yield': [f'{yield_12m:.2f}%']  # Add % symbol and format to 2 decimal places
        })

        # Add the stock information to the DataFrame
        df = pd.concat([df, df_symbol], ignore_index=True)

    # Return the DataFrame
    return df

# Define the budget and allocation
budget = 1000
allocation = [0.2, 0.2, 0.1, 0.1, 0.1, 0.1, 0.05, 0.05, 0.05, 0.05]

# Get the stock information for the symbols based on the risk level
if risk_level.lower() == 'low risk tolerance':
    symbols = ["AGG", "BND", "SPY", "VOO", "VTI", "VXUS", "BNDX", "GLD", "VNQ", "VIG"]
elif risk_level.lower() == 'medium risk tolerance':
    symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "V", "JPM", "JNJ", "UNH", "PG"]
elif risk_level.lower() == 'high risk tolerance':
    symbols = ["XENE", "IOVA", "KRTX", "AUR", "AVDL", "INBX", "ENVX", "GERN", "RLAY", "VRNA"]

# Calculate the amounts for each symbol
amounts = [budget * a for a in allocation]

df = get_stock_info(symbols, amounts)


# Convert the DataFrame to HTML
html_table = df.to_html()

# Define your CSS
css = """
<style type="text/css">
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Provides spacing between the blocks */
  padding: 20px;
  justify-content: center;
}

#chartContainer {
  height: 360px;
  background-color: #fff;
  box-shadow: none; /* Remove if you don't want shadows inside the chart */
}

 table {
    width: 90%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 20px auto;
    background-color: #fff;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.15);
    border-radius: 10px;
    overflow: hidden;
    table-layout: auto;
  }

  th, td {
    border-bottom: 1px solid #ddd;
    padding: 25px 15px;
    transition: all 0.3s ease;
    text-align: center;
  }

  .container td:hover {
    background-color: lightseagreen;
    color: #fcfcfc;
    font-weight: bold;
  
    box-shadow: #000000 -1px 1px, #000000 -2px 2px, #000000 -3px 3px, #000000 -4px 4px, #000000 -5px 5px, #000000 -6px 6px;
    transform: translate3d(6px, -6px, 0);
  
    transition-delay: 0s;
    transition-duration: 0.4s;
    transition-property: all;
    transition-timing-function: line;
}


  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th {
    background-color: lightcyan;
    color: black;
    text-transform: uppercase;
  }

</style>
"""
# Wrap the chart's HTML in a div with the id 'chartContainer'
html_div = '<div id="chartContainer">' + html_div + '</div>'

# Wrap the table's HTML in a div with the class 'container'
html_table = '<div class="container">' + html_table + '</div>'

# Concatenate the HTML for the chart and the table
html = css + html_div + html_table

# Write the HTML to a file
with open('stock_info.html', 'w') as f:
    f.write(html)

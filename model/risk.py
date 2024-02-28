def assess_risk_tolerance(answers):
  """
  Assesses an investor's risk tolerance based on their answers to a questionnaire.
  
  """

  # Define question categories and answer mappings to scores
  categories = {
    "investment_horizon": {
      "A": -2,  # Less than 1 year (lower tolerance)
      "B": -1,  # 1 to 3 years
      "C": 0,   # 4 to 7 years
      "D": 1    # More than 7 years (higher tolerance)
    },
    "comfort_with_fluctuations": {
      "A": -2,  # Very uncomfortable (lower tolerance)
      "B": -1,
      "C": 0,
      "D": 2   # Comfortable with significant fluctuations (higher tolerance)
    },
    "financial_situation": {
      "A": -2,  # Limited savings and significant debt (lower tolerance)
      "B": -1,
      "C": 0,
      "D": 1    # Substantial savings and financial security (higher tolerance)
    },
    "approach_to_financial_decisions": {
      "A": -2,  # Prioritizes safety (lower tolerance)
      "B": 0,
      "C": 1,
      "D": 2   # Comfortable with significant risk (higher tolerance)
    },
    "investment_knowledge": {
      "A": -2,  # Not familiar (lower tolerance)
      "B": -1,
      "C": 0,
      "D": 1    # Strong understanding (higher tolerance)
    },
    "reaction_to_past_losses": {
      "A": -2,  # Anxious and sold investments (lower tolerance)
      "B": -1,
      "C": 0,
      "D": 2   # Viewed it as a buying opportunity (higher tolerance)
    },
    "reliance_on_professional_advice": {
      "A": -2,  # Relies heavily (lower tolerance)
      "B": -1,
      "C": 0,
      "D": 1    # Primarily relies on self-research (higher tolerance)
    },
    "investment_scenario_preference": {
      "A": -2,  # Consistent, predictable returns (lower tolerance)
      "B": -1,
      "C": 0,
      "D": 2   # High potential returns with high risk (higher tolerance)
    },
    "financial_legacy": {
      "A": 0,
      "B": 1,   # Moderately important (potentially higher tolerance)
      "C": 2,   # Major priority (potentially higher tolerance)
    },
    "short_term_loss_response": {
      "A": -2,  # Extremely worried and considered selling (lower tolerance)
      "B": -1,
      "C": 0,
      "D": 2   # Viewed it as a potential buying opportunity (higher tolerance)
    },
    "following_financial_news": {
      "A": -1,  # Not interested (potentially lower tolerance)
      "B": 0,
      "C": 1,
      "D": 2    # Actively researches and analyzes (potentially higher tolerance)
    },
    "investment_allocation": {
      "A": -3,  # All in low-risk savings (lower tolerance)
      "B": -2,  # Equal in low-risk and moderate-risk
      "C": -1,  # Majority in high-risk growth stock fund
      "D": 2    # All in high-risk, high-reward investment (higher tolerance)
    },
    "personality_description": {
      "A": -2,  # Very cautious (lower tolerance)
      "B": -1,
      "C": 1,
      "D": 2   # Adventurous and willing to take significant risks (higher tolerance)
    },
    "investment_philosophy": {
      "A": -2,  # Preserve capital (lower tolerance)
      "B": 0,   # Balanced approach (moderate tolerance)
      "C": 2,   # Maximize potential returns with risk (higher tolerance)
      "D": 3    # Achieve financial goals quickly with substantial risk (highest tolerance)
    }
  }

  # Calculate total score based on answer choices within categories
  total_score = 0
  for question, answer in answers.items():
    if question in categories:
      total_score += categories[question][answer]

  # Interpret the total score and return risk tolerance level
  if total_score <= -6:
    return "Low Risk Tolerance"
  elif total_score <= 6:
    return "Medium Risk Tolerance"
  else:
    return "High Risk Tolerance"

# Example usage
answers = {
  1: "C",  # Investment horizon: 4 to 7 years
  2: "B",  # Comfort with fluctuations: Somewhat uncomfortable
  3: "C",  # Financial situation: Comfortable savings cushion
}

risk_tolerance = assess_risk_tolerance(answers)
print(f"Your risk tolerance is: {risk_tolerance}")
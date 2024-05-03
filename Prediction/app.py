from flask import Flask, render_template, request
import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
import joblib

app = Flask(__name__)

# Load your data into x_visual and y_visual
your_data = pd.read_csv('bank_loan.csv')

# Check if 'target_column' is present in your_data.columns
target_column = 'Personal Loan'
if target_column not in your_data.columns:
    raise ValueError(f"'{target_column}' is not present in the dataset.")

# Convert 'CCAvg' column to numeric (handling fractions)
your_data['CCAvg'] = your_data['CCAvg'].apply(pd.eval).apply(pd.to_numeric, errors='coerce')

# Handle infinite or too large values in the data
your_data.replace([np.inf, -np.inf], np.nan, inplace=True)
your_data.dropna(subset=['CCAvg'], inplace=True)

# Remove 'ID' and 'ZIP Code' from features
x_visual = your_data.drop(['ID', 'ZIP Code', target_column], axis=1)
y_visual = your_data[target_column]

# Define and fit the final model
pipe8_3 = Pipeline([
    # ... (define your pipeline steps)
    ('classifier', RandomForestClassifier())  # Replace with your actual classifier
])

# Fit the model
final_model = pipe8_3
final_model.fit(x_visual, y_visual)

# Save the model after fitting
joblib.dump(final_model, 'final_model.joblib')

# Load the model at the beginning of your script
final_model = joblib.load('final_model.joblib')

# Flask route to render the template
@app.route('/', methods=['GET', 'POST'])
def index():
    result = None

    if request.method == 'POST':
        # Get form data
        age = float(request.form['age'])
        experience = float(request.form['experience'])
        income = float(request.form['income'])
        family = int(request.form['family'])
        ccavg = float(request.form['ccavg'])
        education = int(request.form['education'])
        mortgage = float(request.form['mortgage'])
        securities_account = int(request.form['securities_account'])
        cd_account = int(request.form['cd_account'])
        online = int(request.form['online'])
        credit_card = int(request.form['credit_card'])

        # Create a sample dataframe
        sample = pd.DataFrame({'Age': [age], 'Experience': [experience], 'Income': [income], 'Family': [family],
                               'CCAvg': [ccavg], 'Education': [education], 'Mortgage': [mortgage],
                               'Securities Account': [securities_account], 'CD Account': [cd_account],
                               'Online': [online], 'CreditCard': [credit_card]})

        # Predict sample data
        result = final_model.predict(sample)

    return render_template('index.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)

# import necessary libraries
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from flask import Flask, request, jsonify, render_template
import joblib
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__, static_url_path='/static')
CORS(app)

# Load and preprocess the data
df = pd.read_csv("questions.csv")
X_train, X_test, y_train, y_test = train_test_split(df.question, df.answer, test_size=0.25)

# Train the Naive Bayes model
clf = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('nb', MultinomialNB())
])
clf.fit(X_train, y_train)

# Save the model
joblib.dump(clf, 'model.pkl')

# Load the model
model = joblib.load('model.pkl')

# Define the route for the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Define the route for handling user input and providing bot response
@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.form['userInput']

    # Predict the label for the question
    try:
        predicted_label = model.predict([user_input])[0]
    except IndexError:
        predicted_label = "I could not understand your question. Could you please specify it properly?"

    # Return the bot's response as JSON
    return jsonify({'botResponse': predicted_label})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

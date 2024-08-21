import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC

# Sample data
df = pd.read_csv("Book1.csv")

df['job_title'] = df['job_title']
df['skills'] = df['skills']

# Convert job titles into numerical representations
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['job_title'])

# Train a Linear SVM model
model = LinearSVC()
model.fit(X, df['skills'])

# Function to predict skills given a job title
def predict_skills(job_title):
    job_title_vec = vectorizer.transform([job_title])
    predicted_skills = model.predict(job_title_vec)
    return predicted_skills[0]

# Example usage
job_title = input("Enter the Job Title\n")
predicted_skills = predict_skills(job_title)
print(f"Predicted skills for '{job_title}': {predicted_skills}")
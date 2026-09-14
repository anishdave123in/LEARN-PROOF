import { DemoSubmission, ConceptNode, DefenseTurn } from '../types';

export const INITIAL_DEMO_SUBMISSION: DemoSubmission = {
  id: 'sub-ml-401',
  title: 'Customer Churn Classification & Random Forest Pipeline',
  course: 'CS 401: Applied Machine Learning',
  studentName: 'Alex Chen',
  artifactFileName: 'churn_prediction_pipeline.py',
  artifactCodeSnippet: `import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# 1. Load Dataset
df = pd.read_csv("telecom_churn.csv")
X = df.drop("churn", axis=1)
y = df["churn"]

# 2. Preprocess Data - Feature Scaling
scaler = StandardScaler()
# CRITICAL ISSUE: Scaler fit on entire dataset before splitting!
X_scaled = scaler.fit_transform(X)

# 3. Train Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# 4. Model Training & Evaluation
clf = RandomForestClassifier(n_estimators=100, max_depth=10)
clf.fit(X_train, y_train)

acc = clf.score(X_test, y_test)
print(f"Model Test Accuracy: {acc * 100:.2f}%") # Reports 95.8% Accuracy`,
  initialArtifactScore: 95,
  demonstratedScore: 95,
  concepts: [
    {
      id: 'c-data-preprocessing',
      name: 'Data Preprocessing',
      category: 'Data Engineering',
      status: 'mastered',
      score: 92,
      x: 120,
      y: 80,
      description: 'Handling missing values, feature encoding, and type normalization.'
    },
    {
      id: 'c-classification',
      name: 'Random Forest Classifier',
      category: 'Model Architecture',
      status: 'mastered',
      score: 88,
      x: 340,
      y: 80,
      description: 'Ensemble decision trees with bagging and feature subspace sampling.'
    },
    {
      id: 'c-data-leakage',
      name: 'Validation Isolation & Data Leakage',
      category: 'Evaluation Integrity',
      status: 'superficial',
      score: 64,
      x: 230,
      y: 220,
      description: 'Preventing test distribution parameters from bleeding into training fit.'
    },
    {
      id: 'c-hyperparameter',
      name: 'Hyperparameter Selection',
      category: 'Optimization',
      status: 'mastered',
      score: 85,
      x: 460,
      y: 220,
      description: 'Selecting tree count and depth bounds for bias-variance balance.'
    }
  ],
  edges: [
    { id: 'e1', source: 'c-data-preprocessing', target: 'c-data-leakage', label: 'Feeds Into' },
    { id: 'e2', source: 'c-classification', target: 'c-hyperparameter', label: 'Configures' },
    { id: 'e3', source: 'c-data-leakage', target: 'c-classification', label: 'Validates' }
  ],
  turns: [
    {
      id: 'turn-1',
      turnNumber: 1,
      probeType: 'socratic',
      question: 'Your Random Forest pipeline reports 95.8% accuracy. Walk me through your execution order for StandardScaler relative to dataset partitioning in lines 13–19.',
      contextHint: 'Focus on lines 13 and 17 where fit_transform() and train_test_split() are called.',
      isComplete: false
    }
  ],
  remediation: {
    conceptId: 'c-data-leakage',
    title: 'Data Leakage via Pre-Split Feature Scaling',
    summary: 'When you invoke scaler.fit_transform(X) on the full dataset before splitting into train and test sets, the scaler computes the global mean (μ) and standard deviation (σ) across all samples. Consequently, information from the test set leaks into the training feature set.',
    codeBefore: `# WRONG: Leaks test set mean/std into train fit
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)`,
    codeAfter: `# CORRECT: Fit ONLY on training data, transform test data
X_train, X_test, y_train, y_test = train_test_split(X, y)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test) # Transform only!`,
    keyTakeaway: 'Always fit transformers exclusively on training partitions. Use Pipeline or transform() on test data to prevent optimistic metric distortion.'
  },
  transferChallenge: {
    id: 'tc-1',
    scenario: 'Time-Series Stock Forecasting Scenario',
    question: 'Suppose you are building a financial forecasting model using daily stock prices over 5 years. Why is applying fit_transform() across the entire 5-year dataset before doing a chronological Time-Series split even more catastrophic than in random splits?',
    expectedInsight: 'Because fitting on future dates calculates summary statistics (mean/std/max) from future stock prices, effectively giving past trading algorithms look-ahead information about future price spikes.',
    isPassed: false
  }
};

export const PRESET_STUDENT_RESPONSES = {
  turn1_superficial: "I normalized the dataset first using StandardScaler on line 13 so all feature values have zero mean and unit variance before splitting them into train and test.",
  turn2_flawed: "It doesn't leak anything because StandardScaler only changes the scale of numbers. It doesn't modify the target label variable 'churn' at all.",
  transfer_correct: "Because future stock price distribution statistics (mean, variance, min, max) would leak into past historical training windows, giving the model look-ahead cheat information about future volatility!"
};

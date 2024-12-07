import sys
import json
import pickle
import numpy as np

# Load model, scaler, and label encoder
model = pickle.load(open('best_model3.pkl', 'rb'))
scaler = pickle.load(open('scaler3.pkl', 'rb'))
labelencoder = pickle.load(open('label_encoder3.pkl', 'rb'))

# Get input data from the command line argument
input_data = json.loads(sys.argv[1])

# Convert categorical features using label encoder
input_data['Irrigation_Type'] = labelencoder.transform([input_data['Irrigation_Type']])[0]
input_data['Soil_Type'] = labelencoder.transform([input_data['Soil_Type']])[0]
input_data['Season'] = labelencoder.transform([input_data['Season']])[0]

# Scale numerical features
numerical_features = ['Farm_Area_acres', 'Fertilizer_Used_tons', 'Pesticide_Used_kg', 'Water_Usage_cubic_meters']
input_values = np.array([input_data[feature] for feature in numerical_features]).reshape(1, -1)
scaled_input = scaler.transform(input_values)

# Make prediction
prediction = model.predict(scaled_input)

# Return the prediction as a string
print(prediction[0])

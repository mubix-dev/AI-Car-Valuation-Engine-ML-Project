from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app) # Allows React to talk to this server safely

# Load the pipeline exported from your notebook
with open('LinearRegressionModel.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Turn data from React into a DataFrame matching your model's training shape
        input_data = pd.DataFrame(
            columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'],
            data=np.array([
                data['name'],
                data['company'],
                int(data['year']),
                int(data['kms_driven']),
                data['fuel_type']
            ]).reshape(1, 5)
        )
        
        prediction = model.predict(input_data)
        return jsonify({'price': max(0.0, round(float(prediction[0]), 2))})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
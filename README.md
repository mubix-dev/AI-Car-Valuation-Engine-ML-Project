# AI Car Valuation Engine

A responsive, full-stack machine learning web application that estimates the secondary resale market value of used cars based on historical data. Built using a decoupled architecture with a Python data science core and a modern React user interface.

## 🚀 Live Links
* **Frontend UI (Vercel):** `https://ai-car-valuation-engine-ml-project-sigma.vercel.app/`
* **Backend API (Render):** `https://your-backend-name.onrender.com`

---

## 🛠️ Tech Stack & Architecture

The project is completely decoupled to separate the data science experimental workspace from production environments:

* **Data Science Workbench:** Python, Jupyter Notebook, Pandas, Scikit-Learn (Linear Regression Pipeline)
* **Production Backend:** Flask API, Gunicorn, Flask-CORS (Hosted on Render)
* **Frontend Client:** React (Vite), Tailwind CSS (Hosted on Vercel)

---

## 📂 Repository Structure

```text
AI-Car-Valuation-Engine/
│
├── backend/                  # Python Flask Production API
│   ├── app.py                # Live API server code
│   ├── LinearRegressionModel.pkl # Trained Scikit-Learn pipeline
│   └── requirements.txt      # Production backend cloud dependencies
│
├── frontend/                 # React Web Application Client
│   ├── src/
│   │   ├── App.jsx           # Responsive Tailwind CSS layout component
│   │   └── dropdown_options.json # Component mapping options
│   ├── package.json          # Node dependencies and build scripts
│   └── tailwind.config.js    # Styling framework parameters
│
└── research/                 # Data Science experimental lab
    ├── quikr_car.csv         # Raw training dataset
    ├── cleaned_data.csv      # Processed data output
    └── project.ipynb         # Model cleaning, training, and export notebook

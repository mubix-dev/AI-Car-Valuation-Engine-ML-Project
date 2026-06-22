import React, { useState, useEffect } from 'react';
import dataOptions from './dropdown_options.json'; 

export default function App() {
  const [company, setCompany] = useState('');
  const [availableModels, setAvailableModels] = useState([]);
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [kmsDriven, setKmsDriven] = useState('');
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setAvailableModels(dataOptions.company_car_map[company] || []);
      setModel(''); 
    } else {
      setAvailableModels([]);
    }
  }, [company]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictedPrice(null)

    const payload = { name: model, company, year, kms_driven: kmsDriven, fuel_type: fuelType };

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      setPredictedPrice(result.price);
    } catch (error) {
      alert("Error reaching Flask server. Is app.py running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 antialiased">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        
        {/* Header Decorator banner */}
        <div className="bg-gradient-to-r range from-indigo-600 to-violet-600 px-6 py-8 md:p-10 text-center text-white">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Car Valuation Engine
          </h1>
          <p className="mt-2 text-indigo-100 text-sm md:text-base max-w-md mx-auto">
            Leverage statistical modeling to generate real-time local secondary market car values instantly.
          </p>
        </div>

        {/* Content Form Wrapper */}
        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
          
          {/* Row 1: Brand & Model Variant (Stacked on mobile, side-by-side on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                Manufacturer Brand
              </label>
              <select 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition"
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
                required
              >
                <option value="">-- Choose Brand --</option>
                {dataOptions.companies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                Model / Variant Specification
              </label>
              <select 
                className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                  !company 
                    ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-white border-slate-200 text-slate-800 cursor-pointer'
                }`}
                value={model} 
                onChange={(e) => setModel(e.target.value)} 
                disabled={!company} 
                required
              >
                <option value="">-- Choose Model Variant --</option>
                {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: Production Year & Fuel Infrastructure (Stacked on mobile, side-by-side on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                Registration Year
              </label>
              <select 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition"
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                required
              >
                <option value="">-- Choose Year --</option>
                {dataOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                Fuel Configuration
              </label>
              <select 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition"
                value={fuelType} 
                onChange={(e) => setFuelType(e.target.value)} 
                required
              >
                <option value="">-- Choose Fuel --</option>
                {dataOptions.fuel_types.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          {/* Row 3: Total Mileage (Full width across all screen variants) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-wider text-slate-700 uppercase">
              Total Mileage Odometer (Kilometers)
            </label>
            <input 
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              type="number" 
              min="0"
              value={kmsDriven} 
              onChange={(e) => setKmsDriven(e.target.value)} 
              placeholder="e.g. 45000"
              required 
            />
          </div>

          {/* Action Trigger Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-4 text-center text-white font-semibold text-lg rounded-xl shadow-md transition transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
              loading 
                ? 'bg-indigo-400 cursor-wait' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-100 hover:shadow-lg'
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Architecture Parameters...
              </span>
            ) : 'Generate AI Valuation'}
          </button>
        </form>

        {/* Evaluation Output Section Banner */}
        {predictedPrice !== null && (
          <div className="bg-emerald-50 border-t border-emerald-100 p-6 md:p-8 text-center transition-all duration-300">
            <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase block mb-1">
              Estimated Secondary Market Resale Value
            </span>
            <div className="text-3xl md:text-4xl font-black text-emerald-700 tracking-tight">
              ₹{predictedPrice.toLocaleString('en-IN')}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
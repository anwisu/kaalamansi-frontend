import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
// import './App.scss';
import Header from './Components/Layout/Header';
import Home from './Components/Home';
import PredictQuality from './Components/Predict/PredictQuality';
import QualityResult from './Components/Predict/QualityResult';
import QualityList from './Components/Predict/QualityList';
import PredictDisease from './Components/Predict/PredictDisease';
import DiseaseResult from './Components/Predict/DiseaseResult';
import DiseaseList from './Components/Predict/DiseaseList';
import Login from './Components/User/Login/Login';
import Register from './Components/User/Register/Register';
import Profile from './Components/User/Profile';
import About from './Components/About';
import QualityCM from './Components/ConfusionMatrix/QualityCM';

function App() {
  return (
    <div>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict/quality" element={<PredictQuality />} />
          <Route path="/predict/disease" element={<PredictDisease />} />
          <Route path="/quality/all" element={<QualityList />} />
          <Route path="/disease/all" element={<DiseaseList />} />
          <Route path="/quality/result" element={<QualityResult />} />
          <Route path="/disease/result" element={<DiseaseResult />} />
          
          {/* User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Profile />} />

          {/* Confusion Matrix */}
          <Route path="/quality/confusion-matrix" element={<QualityCM />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;


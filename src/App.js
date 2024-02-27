import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
// import './App.scss';
import Header from './Components/Layout/Header';
import Home from './Components/Home';
import PredictQuality from './Components/Predict/PredictQuality';
import QualityResult from './Components/Predict/QualityResult';
import PredictDisease from './Components/Predict/PredictDisease';
import DiseaseResult from './Components/Predict/DiseaseResult';
import Login from './Components/User/Login/Login';
import Register from './Components/User/Register/Register';
import Profile from './Components/User/Profile';
import About from './Components/About';
import ProtectedRoute from './Route/ProtectedRoute';
import Dashboard from './Components/Admin/Dashboard';
import DiseaseList from './Components/Admin/Disease/DiseaseList';
import QualityList from './Components/Admin/Quality/QualityList';
import QualityDataset from './Components/Admin/Quality/QualityDataset';
import DiseaseDataset from './Components/Admin/Disease/DiseaseDataset';
import UpdateProfile from './Components/User/updateProfile';
import UsersList from './Components/Admin/Users/UsersList';

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
          <Route path="/quality/result" element={<QualityResult />} />
          <Route path="/disease/result" element={<DiseaseResult />} />

          {/* USER ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />


        {/* ADMIN ROUTES */}
          <Route path="/admin/dashboard" element={ <ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}/>
          <Route path="/admin/quality/all" element={<ProtectedRoute isAdmin={true}><QualityList /></ProtectedRoute>} />
          <Route path="/admin/disease/all" element={<ProtectedRoute isAdmin={true}><DiseaseList /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />
          <Route path="/admin/quality/dataset" element={<ProtectedRoute isAdmin={true}><QualityDataset /></ProtectedRoute>} />
          <Route path="/admin/disease/dataset" element={<ProtectedRoute isAdmin={true}><DiseaseDataset /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;


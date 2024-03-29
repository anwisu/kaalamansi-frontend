import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
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
import About from './Components/About/About';
import ProtectedRoute from './Route/ProtectedRoute';
import Dashboard from './Components/Admin/Dashboard';
import DiseaseList from './Components/Admin/Disease/DiseaseList';
import QualityList from './Components/Admin/Quality/QualityList';
import QualityDataset from './Components/Admin/Quality/QualityDataset';
import DiseaseDataset from './Components/Admin/Disease/DiseaseDataset';
import UpdateProfile from './Components/User/updateProfile';
import UsersList from './Components/Admin/Users/UsersList';
import QualityRecoList from './Components/Admin/Recommendations/QualityRecoList';
import NewQualityRecommendations from './Components/Admin/Recommendations/NewQualityRecommendations';
import UpdateUser from './Components/Admin/Users/updateUsers';
import DiseaseRecoList from './Components/Admin/Recommendations/DiseaseRecoList';
import NewDiseaseRecommendations from './Components/Admin/Recommendations/NewDiseaseRecommendations';
import UpdateQualityReco from './Components/Admin/Recommendations/UpdateQualityReco';
import UpdateDiseaseReco from './Components/Admin/Recommendations/UpdateDiseaseReco';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Planting from './Components/Guide'

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <Router>
      <ToastContainer />
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict/quality" element={<ProtectedRoute><PredictQuality /></ProtectedRoute>} />
          <Route path="/predict/disease" element={<ProtectedRoute><PredictDisease /></ProtectedRoute>} />
          <Route path="/predict/quality/:id"  element={<ProtectedRoute><QualityResult /></ProtectedRoute>} />
          <Route path="/predict/disease/:id" element={<ProtectedRoute><DiseaseResult /></ProtectedRoute>} />
          <Route path="/guide" element={<Planting exact="true" />} />

          {/* USER ROUTES */}
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />

        {/* ADMIN ROUTES */}
          <Route path="/admin/dashboard" element={ <ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}/>
          <Route path="/admin/quality/all" element={<ProtectedRoute isAdmin={true}><QualityList /></ProtectedRoute>} />
          <Route path="/admin/disease/all" element={<ProtectedRoute isAdmin={true}><DiseaseList /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>} />
          <Route path="/admin/users/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
          <Route path="/admin/quality/dataset" element={<ProtectedRoute isAdmin={true}><QualityDataset /></ProtectedRoute>} />
          <Route path="/admin/disease/dataset" element={<ProtectedRoute isAdmin={true}><DiseaseDataset /></ProtectedRoute>} />
          <Route path="/admin/quality/recommendation/new" element={<ProtectedRoute isAdmin={true}><NewQualityRecommendations /></ProtectedRoute>} />
          <Route path="/admin/quality/recommendations/all" element={<ProtectedRoute isAdmin={true}><QualityRecoList /></ProtectedRoute>} />
          <Route path="/admin/quality/recommendations/:id" element={<ProtectedRoute isAdmin={true}><UpdateQualityReco /></ProtectedRoute>} />
          <Route path="/admin/disease/recommendations/:id" element={<ProtectedRoute isAdmin={true}><UpdateDiseaseReco /></ProtectedRoute>} />
          <Route path="/admin/disease/recommendation/new" element={<ProtectedRoute isAdmin={true}><NewDiseaseRecommendations /></ProtectedRoute>} />
          <Route path="/admin/disease/recommendations/all" element={<ProtectedRoute isAdmin={true}><DiseaseRecoList /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;


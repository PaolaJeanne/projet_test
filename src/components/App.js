import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardClient from '../pages/DashboardClient';
import DashboardExpert from '../pages/DashboardExpert';
import AppointmentPage from '../pages/AppointmentPage';
import ProfilePage from '../pages/ProfilePage';
import NotificationPage from '../pages/NotificationPage'; 
import Header from './Common/Header'; // Import the Header component
import '../styles/App.css'; 

const App = () => (
    <Router>
        <AuthProvider>
            <Header /> {/* Add the Header component here */}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard-client" element={<DashboardClient />} />
                <Route path="/dashboard-expert" element={<DashboardExpert />} />
                <Route path="/appointments" element={<AppointmentPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </AuthProvider>
    </Router>
);

export default App;
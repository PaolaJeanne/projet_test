import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardClient from './pages/DashboardClient';
import DashboardExpert from './pages/DashboardExpert';
import AppointmentPage from './pages/AppointmentPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage'; // Chemin mis à jour

const App = () => (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard-client" element={<DashboardClient />} />
                <Route path="/dashboard-expert" element={<DashboardExpert />} />
                <Route path="/appointments" element={<AppointmentPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </AuthProvider>
    </Router>
);

export default App;
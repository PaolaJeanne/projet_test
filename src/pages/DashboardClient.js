import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import AppointmentList from '../components/Appointment/AppointmentList';
import Profile from '../components/User/Profile';

const DashboardClient = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <h1>Tableau de bord client</h1>
            <h2>Bienvenue, {currentUser?.first_name} {currentUser?.last_name}</h2>
            <Profile />
            <AppointmentList />
        </div>
    );
};

export default DashboardClient;
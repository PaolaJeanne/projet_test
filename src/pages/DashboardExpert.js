import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AvailabilityManager from '../components/Expert/AvailabilityManager';
import AppointmentList from '../components/Appointment/AppointmentList';
import Profile from '../components/User/Profile';

const DashboardExpert = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <h1>Tableau de bord expert</h1>
            <h2>Bienvenue, {currentUser?.first_name} {currentUser?.last_name}</h2>
            <Profile />
            <AvailabilityManager />
            <AppointmentList />
        </div>
    );
};

export default DashboardExpert;
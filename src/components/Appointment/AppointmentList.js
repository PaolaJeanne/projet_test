import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; 
import apiClient from '../../services/api'; 
import '../../styles/AppointmentList.css';


const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            apiClient.get('/appointments/')
                .then(response => setAppointments(response.data))
                .catch(error => console.error('Error fetching appointments', error));
        }
    }, [currentUser]);

    return (
        <div>
            <h2>Mes rendez-vous</h2>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.datetime} - {appointment.expert.user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;
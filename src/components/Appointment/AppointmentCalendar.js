import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AuthContext } from '../../context/AuthContext'; // Correction du chemin d'importation
import apiClient from '../../services/api'; // Vérification de l'importation

const localizer = momentLocalizer(moment);

const AppointmentCalendar = () => {
    const [events, setEvents] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            apiClient.get('/appointments/')
                .then(response => {
                    const formattedEvents = response.data.map(appointment => ({
                        title: `Rendez-vous avec ${appointment.expert.user.username}`,
                        start: new Date(appointment.datetime),
                        end: new Date(moment(appointment.datetime).add(1, 'hour')),
                    }));
                    setEvents(formattedEvents);
                })
                .catch(error => console.error('Error fetching appointments', error));
        }
    }, [currentUser]);

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
};

export default AppointmentCalendar;
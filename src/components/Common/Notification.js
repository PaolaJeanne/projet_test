import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import io from 'socket.io-client';
import '../../styles/Notification.css';



const socket = io('http://localhost:8000');

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            socket.on('new_notification', (notification) => {
                setNotifications((prev) => [...prev, notification]);
            });
        }
    }, [currentUser]);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;
import React, { useState } from 'react';
import '../../styles/Notification.css'; 

const Notification = () => {
    const [notifications] = useState([]);

    return (
        <div className="notification-container">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index} className={notification.read ? '' : 'unread'}>
                        {notification.message}
                        <span className="timestamp">{new Date(notification.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;
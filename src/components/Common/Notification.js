import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Notification.css'; // Importez le fichier CSS

const Notification = () => {
    const [notifications] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            // Remplacez cette partie par une autre méthode pour obtenir les notifications
            // Par exemple, vous pouvez utiliser une requête API pour obtenir les notifications
            // apiClient.get('/notifications/')
            //     .then(response => setNotifications(response.data))
            //     .catch(error => console.error('Error fetching notifications', error));
        }
    }, [currentUser]);

    return (
        <div className="notification-container">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index} className={notification.read ? '' : 'unread'}>
                        {notification.message}
                        {/* Ajoutez un timestamp si nécessaire */}
                        <span className="timestamp">{new Date(notification.timestamp).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;
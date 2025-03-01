import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiClient from '../../services/api';

const AvailabilityManager = () => {
    const [slots, setSlots] = useState([]);
    const [newSlot, setNewSlot] = useState({ day_of_week: 0, start_time: '09:00', end_time: '17:00' });
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser && currentUser.role === 'EXPERT') {
            apiClient.get('/appointments/availability-slots/')
                .then(response => setSlots(response.data))
                .catch(error => console.error('Error fetching slots', error));
        }
    }, [currentUser]);

    const handleAddSlot = async () => {
        try {
            const response = await apiClient.post('/appointments/availability-slots/', newSlot);
            setSlots([...slots, response.data]);
        } catch (error) {
            console.error('Error adding slot', error);
        }
    };

    return (
        <div>
            <h2>Gestion des disponibilités</h2>
            <ul>
                {slots.map(slot => (
                    <li key={slot.id}>
                        Jour {slot.day_of_week} : {slot.start_time} à {slot.end_time}
                    </li>
                ))}
            </ul>
            <div>
                <select
                    value={newSlot.day_of_week}
                    onChange={(e) => setNewSlot({ ...newSlot, day_of_week: parseInt(e.target.value) })}
                >
                    <option value={0}>Lundi</option>
                    <option value={1}>Mardi</option>
                    <option value={2}>Mercredi</option>
                    <option value={3}>Jeudi</option>
                    <option value={4}>Vendredi</option>
                    <option value={5}>Samedi</option>
                    <option value={6}>Dimanche</option>
                </select>
                <input
                    type="time"
                    value={newSlot.start_time}
                    onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })}
                />
                <input
                    type="time"
                    value={newSlot.end_time}
                    onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })}
                />
                <button onClick={handleAddSlot}>Ajouter un créneau</button>
            </div>
        </div>
    );
};

export default AvailabilityManager;
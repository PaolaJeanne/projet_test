import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiClient from '../services/api';

const ExpertProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        specialization: '',
    });

    useEffect(() => {
        if (currentUser && currentUser.role === 'EXPERT') {
            apiClient.get('/experts/me/')
                .then(response => setProfile(response.data))
                .catch(error => console.error('Error fetching expert profile', error));
        }
    }, [currentUser]);

    const handleUpdateProfile = async () => {
        try {
            await apiClient.put('/experts/me/', profile);
            alert('Profil expert mis à jour avec succès !');
        } catch (error) {
            console.error('Error updating expert profile', error);
        }
    };

    return (
        <div>
            <h2>Profil expert</h2>
            <input
                type="text"
                placeholder="Spécialisation"
                value={profile.specialization}
                onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
            />
            <button onClick={handleUpdateProfile}>Mettre à jour</button>
        </div>
    );
};

export default ExpertProfile;
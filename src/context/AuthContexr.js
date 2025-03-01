import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importez useNavigate
import apiClient from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Remplacez useHistory par useNavigate

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            apiClient.get('/accounts/me/')
                .then(response => {
                    setCurrentUser(response.data);
                })
                .catch(error => {
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const response = await apiClient.post('/accounts/login/', credentials);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setCurrentUser(user);
    
        // Redirection en fonction du rôle
        if (user.role === 'CLIENT') {
            navigate('/dashboard-client');  // Utilisez navigate ici
        } else if (user.role === 'EXPERT') {
            navigate('/dashboard-expert');  // Utilisez navigate ici
        }
    
        return user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
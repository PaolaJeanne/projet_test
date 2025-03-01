import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Remplacez useHistory par useNavigate
import { AuthContext } from './context/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Utilisez useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            navigate('/dashboard'); // Utilisez navigate pour rediriger
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default Login;
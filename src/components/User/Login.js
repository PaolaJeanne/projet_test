import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importez Link
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Login.css'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Connexion</h2>
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
                <p className="register-link">
                    Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
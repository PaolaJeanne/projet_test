import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import apiClient from '../../services/api';
import '../../styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        phone_number: '',
        role: 'CLIENT', 
    });
    const navigate = useNavigate(); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/accounts/register/', formData);
            navigate('/login'); 
        } catch (error) {
            console.error('Registration failed', error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Nom"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
            </div>
            
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Prénom"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
            </div>
            
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
            </div>
            
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>
            
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Numéro de téléphone"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                />
            </div>
            
            <div className="form-group">
                <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                    <option value="CLIENT">Client</option>
                    <option value="EXPERT">Expert</option>
                </select>
            </div>
            
            <button type="submit">S'inscrire</button>
            
            <p className="register-link">
                Vous n'avez pas de compte ? <Link to="/login">Connectez-vous</Link>
            </p>
        </form>
    );
};

export default Register;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <Link to="/">Accueil</Link>
                {currentUser ? (
                    <>
                        <Link to="/profile">Profil</Link>
                        <Link to="/notifications">Notifications</Link>
                        <button onClick={logout}>Déconnexion</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Connexion</Link>
                        <Link to="/register">Inscription</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
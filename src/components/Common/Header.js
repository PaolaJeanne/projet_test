import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Header.css';
import logo from '../../assets/logo.jpg'; 

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                <div className="nav-links">
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
                </div>
            </nav>
        </header>
    );
};

export default Header;
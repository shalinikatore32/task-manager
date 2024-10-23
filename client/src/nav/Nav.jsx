import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Consumer } from '../store-token/UseAuth';

const Navbar = () => {
    const { isLoggedin } = Consumer();
    
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <NavLink to="/">MyLogo</NavLink>
            </div>
            <div className="navbar-buttons">
                {isLoggedin ? (
                    <>
                        <NavLink to="/dashboard" className="navbar-button">Dashboard</NavLink>
                        <NavLink to="/logout" className="navbar-button">Logout</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="navbar-button">Login</NavLink>
                        <NavLink to="/signup" className="navbar-button">Signup</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

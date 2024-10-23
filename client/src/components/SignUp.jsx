import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signUp.css'; // Import CSS file
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5008/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.ok) {

                toast.success("Registered Successfully");
    
                navigate('/login');
            } else {
                toast.error("Data could not be submitted");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`signup-container ${loading ? 'blurred' : ''}`}>
            {loading && (
                <div className="spinner-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <div className="signup-form-wrapper">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="signup-form-group">
                        <label htmlFor="fname">First Name</label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            value={formData.lname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button" disabled={loading}>
                        Sign Up
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

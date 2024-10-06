import React, { useState } from 'react';
import axios from 'axios';
const BASE_URL = "http://localhost:8111/"

const LoginForm = ({stateChanger}) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        role: '',
    });

    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission for Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BASE_URL+'user/registration', formData);
            setIsLogin(true); // Switch to login after signup
        } catch (error) {
            console.error('Signup Error:', error);
            alert('Error during signup.');
        }
    };

    // Handle form submission for Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Replace this API call with your login logic or backend API
            const response = await axios.post(BASE_URL+'user/login?username='+formData.username+"&pasword="+formData.password);
            console.log('Login Response:', response.data);
            localStorage.setItem("token",response.data.token);
            stateChanger(true);
        } catch (error) {
            console.error('Login Error:', error);
            alert('Invalid username or password.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ddd' }}>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

            <form style={{textAlign:"left"}} onSubmit={isLogin ? handleLogin : handleSignup}>
                {!isLogin && (
                    <>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                                required
                            />
                        </div>
                    </>
                )}

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        required
                    />
                </div>

                {!isLogin && (
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            required
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                )}

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>

            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                {isLogin ? 'New user?' : 'Already have an account?'}{' '}
                <button onClick={() => setIsLogin(!isLogin)} style={{ backgroundColor: 'transparent', border: 'none', color: 'blue' }}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>

        </div>
    );
};

export default LoginForm;

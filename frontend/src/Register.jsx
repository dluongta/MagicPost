import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from './component/Message';
import { register } from './actions/userActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
          // Fetch user details if needed
          const fetchUserDetails = async () => {
            try {
              const { data } = await axios.get(`/api/users/${userInfo._id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`, // hoặc tùy thuộc vào cách bạn lưu token
                },
              });
              if (!data.isValidated) {
                navigate('/verify-page');
              } else {
                navigate('/');
              }
            } catch (error) {
              console.error('Error fetching user details:', error);
              setMessage('Failed to fetch user details.');
            }
          };
          
          
          fetchUserDetails();
        }
      }, [userInfo, redirect, navigate]);
      

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <>
            <div className="form-container">
                <form action="" method="post" onSubmit={submitHandler}>
                    <h3>Sign Up</h3>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="enter name" 
                        className="box" 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="enter email" 
                        className="box" 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        placeholder="enter password" 
                        className="box" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        required 
                        placeholder="confirm password" 
                        className="box" 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <input type="submit" name="submit" className="btn" value="register now" />
                    <p>Have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </>
    );
};

export default Register;

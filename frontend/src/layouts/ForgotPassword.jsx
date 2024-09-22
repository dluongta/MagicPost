import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Message from "../component/Message";

const ForgotPassword = () => {
    const [resetEmail, setResetEmail] = useState("");
    const [message, setMessage] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.message) {
            setResetEmail(location.state.message);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/forgot-password', {
                email: resetEmail,
            });            
            setMessage("Reset Password Mail Sent");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setMessage("Error sending email. Please try again.");
        }
    };

    return (
        <>
            {message && <Message variant='success'>{message}</Message>}
            <div className="form-container">

                <form onSubmit={handleSubmit} method="POST">
                    <input
                        type="text"
                        name="email"
                        required
                        placeholder="Enter email"
                        className="box"
                        onChange={(e) => setResetEmail(e.target.value)}
                        value={resetEmail}
                    />
                    <br />
                    <input type="submit" className="btn" value="Submit" />
                </form>

            </div>
        </>

    );
};

export default ForgotPassword;

import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import axios from "axios";

const ResetPassword = () => {
  const { id, token } = useParams(); // Retrieve id and token from URL parameters
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Send the reset password request to the server
    try {
      const response = await axios.post(`/api/reset-password/${id}/${token}`, {
        password,
      });

      if (response.data.status === "Password Updated Succeeded") {
        navigate("/login", {
          state: { message: "Reset Password Succeeded" },
        });
        setMessage(response.data.status);
      } else {
        setMessage(response.data.status); // Show status from the server
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <>
      {message && <Message variant='success'>{message}</Message>}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <input
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            className="box"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /><br />
          <input type="submit" className="btn" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default ResetPassword;

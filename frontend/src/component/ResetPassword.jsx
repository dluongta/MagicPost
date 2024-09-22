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

    // Optionally set a success message
    setMessage("Reset Password Succeeded");

    // Send the reset password request to the server
    try {
      const response = await axios.post(`/reset-password/${id}/${token}`, {
        password,
      });
      if (response.data.status === "Password Updated Successfully") {
        navigate("/login", {
          state: { message: "Reset Password Succeeded" },
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="form-container">
      {message && <Message variant="success">{message}</Message>}
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
  );
};

export default ResetPassword;

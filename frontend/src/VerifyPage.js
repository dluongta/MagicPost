import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to extract email from the URL query parameters
  const getEmailFromQuery = () => {
    const query = new URLSearchParams(location.search);
    return query.get('email');
  };

  const resendVerification = async () => {
    const email = getEmailFromQuery();

    if (!email) {
      alert("No email address found. Please enter your email address.");
      return;
    }

    try {
      const response = await fetch('/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error resending verification email:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Your account is being verified!</h2>
      <p>We have sent a verification email to {getEmailFromQuery()}.</p>
      <button onClick={resendVerification} style={styles.button}>
        Resend Verification Email
      </button>
      <p style={styles.link} onClick={() => navigate('/login')}>
        Go back to the login page
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  link: {
    marginTop: '20px',
    color: '#007BFF',
    cursor: 'pointer',
  },
};

export default VerifyPage;

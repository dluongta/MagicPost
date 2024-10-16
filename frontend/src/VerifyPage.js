import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyPage = () => {
  const navigate = useNavigate();

  const resendVerification = async () => {
    const email = prompt("Please enter your email address:");

    if (!email) return;

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
      <h2>Tài khoản của bạn đang được xác minh!</h2>
      <p>Chúng tôi đã gửi email xác minh đến địa chỉ của bạn.</p>
      <button onClick={resendVerification} style={styles.button}>
        Gửi lại mã
      </button>
      <p style={styles.link} onClick={() => navigate('/login')}>
        Quay lại trang đăng nhập
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

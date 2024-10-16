import React from 'react';
import { Link } from 'react-router-dom';

const AccountVerified = () => {
  return (
    <div style={styles.container}>
      <h2>Tài khoản của bạn đã được xác nhận!</h2>
      <p>Bây giờ bạn có thể đăng nhập vào tài khoản của mình.</p>
      <Link to="/login" style={styles.link}>Đăng nhập ngay</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    background: '#007BFF',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
  },
};

export default AccountVerified;

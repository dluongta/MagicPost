import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import logo from '../assets/header.jpeg';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector(state => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    setOpen(false);
  };

  const renderManagementLinks = () => (
    <>
      <li><Link to='/search' onClick={() => setOpen(false)}>Tìm kiếm</Link></li>
      {userInfo?.isAdmin && (
        <>
          <li><Link to='/admin/postlist' onClick={() => setOpen(false)}>Quản lý đơn hàng</Link></li>
          <li><Link to='/admin/userlist' onClick={() => setOpen(false)}>Quản lý người dùng</Link></li>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand-title">
          <Link to="/"><img src={logo} width={90} alt="logo" /></Link>
          <span>Magic Post</span>
        </div>

        {/* Hamburger Mobile */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          <span /><span /><span />
        </div>

        {/* Nav Links Desktop */}
        <ul className="nav-links">
          {userInfo ? (
            <>
              <li>Hi, {userInfo.name}</li>
              <li><Link to="/profile">Profile</Link></li>
              <li><span className="logout-btn" onClick={logoutHandler}>Logout</span></li>
            </>
          ) : (
            <li><Link to="/login" className="login-link">Login</Link></li>
          )}
          <li><Link to="/chat">Chat</Link></li>
          {renderManagementLinks()}
        </ul>
      </nav>

      {/* Sidebar PC */}
      <aside className='navSidebar desktop-sidebar'>
        <h1>Menu</h1>
        <ul className='menu'>
          {!userInfo && <li><Link to="/login" className="login-link">Login</Link></li>}
          {renderManagementLinks()}
        </ul>
      </aside>

      {/* Mobile Drawer */}
      <div className={`overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)}></div>
      <div className={`mobile-drawer ${open ? 'show' : ''}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
        <ul className="drawer-list">
          {userInfo ? (
            <li className="user-info">Hi, {userInfo.name}</li>
          ) : (
            <li><Link to="/login" onClick={() => setOpen(false)} className="login-link">Login</Link></li>
          )}
          <li><Link to="/chat" onClick={() => setOpen(false)}>Chat</Link></li>
          <hr />
          {renderManagementLinks()}
          {userInfo && <li className="logout" onClick={logoutHandler}>Logout</li>}
        </ul>
      </div>
    </>
  );
};

export default Header;

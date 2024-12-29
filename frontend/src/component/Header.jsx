import logo from '../assets/header.jpeg'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useState } from 'react'

const Header = () => {
  const dispatch = useDispatch()
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".navbar")
    header?.classList.toggle("active", this.window.scrollY > 200)
  })
  return (
    <>
      <marquee>Chào mừng đến với MagicPost</marquee>
      <nav className="navbar">
        <div className="brand-title">
          <Link to='/'><img width={95} height={60} src={logo} alt="Logo" /></Link>
          <p><Link to='/'>Magic Post</Link></p>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {userInfo ? <li><a href="#">Username: {userInfo.name}</a></li> : <li><Link to="/login">Login</Link></li>}
            <li><Link to="/chat">Chat</Link></li>
            {userInfo && <li><Link to="/profile">Profile</Link></li>}
            {userInfo && <li><a href="#" onClick={logoutHandler}>Logout</a></li>}
          </ul>
        </div>
      </nav>

        <div className='navSidebar'>
          <h1>Menu</h1>
          <ul className='menu'>
            <li><Link to='/search'>Tìm kiếm</Link></li>
            {userInfo && userInfo.isAdmin && <li><Link to='/admin/postlist'>Quản lý đơn hàng</Link></li>}
            {userInfo && userInfo.isAdmin && <li><Link to='/admin/userlist'>Quản lý người dùng</Link></li>}
          </ul>
        </div>
    </>
  )
}
export default Header


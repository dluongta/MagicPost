import logo from '../assets/header.jpeg'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useState, useEffect } from 'react'

const Header = () => {
  const dispatch = useDispatch()
  const [isMenuOpen, setMenuOpen] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const logoutHandler = () => {
    dispatch(logout())
    setMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".navbar")
      header?.classList.toggle("active", window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Marquee */}
      <div className="marquee-container">
        <marquee behavior="scroll" direction="left" scrollamount="10">
          Chào mừng đến với MagicPost
        </marquee>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="brand-title">
          <Link to='/'>
            <img width={95} height={60} src={logo} alt="Logo" />
          </Link>
          <p><Link to='/'>Magic Post</Link></p>
        </div>

        {/* Hamburger */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Desktop right menu */}
        <div className="navbar-links desktop-menu">
          <ul>
            {userInfo ? (
              <li><span>{userInfo.name}</span></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
            <li><Link to="/chat">Chat</Link></li>
            {userInfo && <li><Link to="/profile">Profile</Link></li>}
            {userInfo && <li><button onClick={logoutHandler}>Logout</button></li>}
          </ul>
        </div>
      </nav>

      {/* MOBILE MENU – DƯỚI NAVBAR */}
      {/* MOBILE MENU + OVERLAY */}
{isMenuOpen && (
  <>
    {/* Overlay */}
    <div
      className="menu-overlay"
      onClick={() => setMenuOpen(false)}
    ></div>

    {/* Menu */}
    <div
      className="mobile-menu"
      onClick={(e) => e.stopPropagation()} // chặn click lan ra overlay
    >
      <ul>
        <li><Link to="/search" onClick={toggleMenu}>Tìm kiếm</Link></li>

        {userInfo && userInfo.isAdmin && (
          <>
            <li><Link to="/admin/postlist" onClick={toggleMenu}>Quản lý đơn hàng</Link></li>
            <li><Link to="/admin/userlist" onClick={toggleMenu}>Quản lý người dùng</Link></li>
          </>
        )}

        <li><Link to="/chat" onClick={toggleMenu}>Chat</Link></li>

        {userInfo ? (
          <>
            <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
            <li><button onClick={logoutHandler}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
        )}
      </ul>
    </div>
  </>
)}


      {/* SIDEBAR – CHỈ DESKTOP */}
      <aside className="navSidebar">
        <h1>Menu</h1>
        <ul className="menu">
          <li><Link to="/search">Tìm kiếm</Link></li>
          {userInfo && userInfo.isAdmin && (
            <>
              <li><Link to="/admin/postlist">Quản lý đơn hàng</Link></li>
              <li><Link to="/admin/userlist">Quản lý người dùng</Link></li>
            </>
          )}
        </ul>
      </aside>
    </>
  )
}

export default Header

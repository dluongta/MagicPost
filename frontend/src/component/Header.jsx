import logo from '../assets/header.jpeg'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

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
        <Link to='/'><img width={95} height={60} src={logo} /></Link>
          <p><Link to='/'>Magic Post</Link></p>
        </div>

        <div className="navbar-links">
          <ul>
            {userInfo ? <li><a href="#">Username: {userInfo.name}</a></li> : <li><a href="/login">Login</a></li>}
            <li><a href="/chat" >Chat</a></li>
            {userInfo && <li><a href="/profile">Profile</a></li>}
            {userInfo && <li><a href="#" onClick={logoutHandler}>Logout</a></li>}
            


          </ul>
        </div>
      </nav>
      <div className='lefmenuinnerinner'>
        <div className='navSidebar'>
          <h1>Menu</h1>
          <ul className='menu'>
            <li><Link to='/search'>Tim kiem</Link></li>
            {userInfo && userInfo.isAdmin && <li><Link to='/admin/postlist'>Quan ly don hang</Link></li>}
            {userInfo && userInfo.isAdmin && <li><Link to='/admin/userlist'>Quan ly nguoi dung</Link></li>}


          </ul>
        </div>
      </div>
    </>
  )
}
export default Header


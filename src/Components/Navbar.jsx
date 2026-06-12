import React, { useContext } from 'react'
import '../assets/css/navbar.css'
import img1 from '../assets/img1.png';
import {Link,useNavigate} from 'react-router-dom';
import {UserContext} from '../App'

const Navbar = () => {
  const {user}=useContext(UserContext)
  return (
    <div className='navbar'>
        <div className='navbar-left'>
             <img src={img1} alt="profile" height={30} width={30} />
            <Link to="/" className='navbar-brand' >Contact Management System</Link>
        </div>
        <div className='navbar-right'>
            {
             user ? 
             <>
                <Link to="/dashboard" className='navbar-link'>Contact</Link>
                <Link to="/dashboard/profile" className='navbar-link'>{user.name}</Link>
                <Link to="/logout" className='navbar-link'>Logout</Link>
             </> :
             <>
             <Link to="/login" className='navbar-link'>Login</Link>
            <Link to="/register" className='navbar-link'>Register</Link>
             </>
            }
        </div>
    </div>
  )
}

export default Navbar
import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {FaBars, FaUserPlus,FaPowerOff, FaRegAddressCard, FaUser } from 'react-icons/fa6'
import '../assets/css/sidebar.css'
const Sidebar = () => {
    const [activeLink,setActiveLink]=useState(1)
    const navigate=useNavigate()
  return (
    <div className='sidebar'>
        <div className='sidebar-item'>
            <FaBars className='top-icon'/>
        </div>
        <div className={`sidebar-item ${activeLink===0?"active":""}`}
         onClick={()=>setActiveLink(0)}>
            <Link to="/dashboard/profile" className='sidebar-link'>
                <FaUser className='icon'/> Profile</Link>
        </div>
        <div className={`sidebar-item ${activeLink===1?"active":""}`} 
         onClick={()=>setActiveLink(1)}>
            <Link to="/dashboard" className='sidebar-link'>
            <FaRegAddressCard className='icon'/>Contacts</Link>
        </div>
        <div className={`sidebar-item ${activeLink===2?"active":""}`} onClick={()=>setActiveLink(2)}>
            <Link to="/dashboard/add-contact" className='sidebar-link'>
            <FaUserPlus className='icon'/>Add Contact</Link>
        </div>
        <div className={`sidebar-item ${activeLink===3?"active":""}`} onClick={()=>setActiveLink(3)}>
            <Link to="/logout" className='sidebar-link'>
            <FaPowerOff className='icon'/>Exit</Link>
        </div>
    </div>
  )
}

export default Sidebar
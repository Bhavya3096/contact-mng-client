import React from 'react'
import '../assets/css/dashboard.css'
import Navbar from '../Components/Navbar.jsx'
import Sidebar from '../Components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
  return (
    <>
        <Navbar/>
        <div className='dashboard'>
            <div className='sidebar-container'>
                <Sidebar/>
            </div>
            <div className='contact-container'>
                <Outlet/>
            </div>
        </div>
    </>
  )
}

export default Dashboard
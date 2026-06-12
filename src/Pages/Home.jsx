import React from 'react'
import '../assets/css/home.css'
import Navbar from '../Components/Navbar'
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='home'>
        <h1 className='home-title'>CONTACT  MANAGEMENT  APPLICATION</h1>
        <h3 className='home-description'>Start collecting your contacts in a smarter way. We Provide efficient and smarter way to handle contacts.</h3>

    </div>
    </>
  )
}

export default Home
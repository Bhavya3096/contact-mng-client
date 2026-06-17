import React, { useState, useEffect, createContext } from 'react';
import Home from './Pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Dashboard from './Pages/Dashboard';
import Contacts from './Components/Contacts.jsx'
import AddContact from './Components/AddContact.jsx';
import EditContact from './Components/EditContact.jsx'
import Logout from './Components/Logout.jsx';
import ProtectedRoutes from './Components/ProtectedRoutes.jsx';
import ContactCard from './Components/ContactCard.jsx';
import Profile from './Pages/Profile.jsx';

export const UserContext = createContext(null);

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> },
  {path:'/dashboard',element:/*<ProtectedRoutes>*/<Dashboard/>/*</ProtectedRoutes>*/,
    children:[
      {index:true, element:<Contacts/>},
      {path:"/dashboard/add-contact",element:<AddContact/>},
      {path:"edit-contact/:id", element:<EditContact/>},
      { path: "profile", element: <Profile /> }]},
  { path: '/contact/:id', element: <ContactCard /> },
  { path: '/logout', element: <Logout/> }
]);

const App = () => {
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    axios.get('https://contact-mng-server.onrender.com/contactmng/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data.success) {
        setUser(res.data.user); 
      }
    })
    .catch(err => {
      console.log(err);
      localStorage.removeItem("token");
    })
    .finally(() => {
      setLoading(false);
    });

  }, []);

  if (loading) return <h2>Loading...</h2>; 

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};
export default App;
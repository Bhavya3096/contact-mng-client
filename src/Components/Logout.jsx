import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { setUser } = useContext(UserContext)
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  useEffect(() => {

    MySwal.fire({
      title: "Are you Sure?",
      text: "Do you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes, I want to exit"
    }).then((result) => {

      if (result.isConfirmed) {
        localStorage.clear()
        setUser(null)
        navigate("/") // ✅ logout
      } else {
        navigate("/dashboard") // ✅ go back if cancel
      }

    });

  }, []);

  return null;
}

export default Logout;
import '../assets/css/form.css'
import {Link, useNavigate} from 'react-router-dom'
import Validation from '../Components/Validation'
import axios from 'axios'
import {toast} from 'react-toastify'
import React, { useState, useContext } from 'react'
import { UserContext } from "../App";

const Login = () => {
    const { setUser } = useContext(UserContext);

    const [values,setValues]=useState({
        email:'',
        password:''
    })
    const [errors,setErrors]=useState({})
    const [serverErrors,setServerErrors]=useState([])
    const navigate=useNavigate()
    const handleInput=(event)=>{
        setValues({...values,[event.target.name]:event.target.value})
    }
    const handleSubmit = (e) => {
    e.preventDefault()

    const errs = Validation(values)
    setErrors(errs)

    if (!errs.email && !errs.password) {

        setServerErrors([])

        axios.post('http://127.0.0.1:3000/contactmng/login', values)
        .then(res => {
            toast.success("Login Successfully", {
                position: "top-right",
                autoClose: 5000
            })
            localStorage.setItem("token",res.data.token)
            setUser(res.data.user)
            navigate('/Dashboard')
        })
        .catch(err => {
            console.log(err)

            if (err.response?.data?.errors) {
                setServerErrors(err.response.data.errors)
            }
        })
    }
}
  return (
    <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <h2>Login to your Account</h2>
            <div className='form-group'>
                <label htmlFor='email' className='form-label'>Email:</label>
                <input type="email"  name="email" placeholder='Enter Email' autoComplete='off' onChange={handleInput}/>
                { errors.email && <span className='error'>{errors.email}</span>}
            </div>
             <div className='form-group'>
                <label htmlFor='password' className='form-label'>Password:</label>
                <input type="password" placeholder='*********' className='form-control' name='password' onChange={handleInput}></input>
                { errors.password && <span className='error'>{errors.password}</span>}
            </div>
            {
                serverErrors.length>0 &&(
                    serverErrors.map((error,index)=>(
                        <p className='error' key={index}>{error.msg}</p>
                    ))
                )
            }
            <button className='form-btn'>Login</button>
            <p className='t1'>Do not you have an account?  <Link to="/register">Register</Link></p>
        </form>
    </div>
  )
}

export default Login
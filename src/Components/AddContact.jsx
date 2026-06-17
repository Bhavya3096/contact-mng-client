import React, { useState } from 'react'
import '../assets/css/form.css'
import { useNavigate } from 'react-router-dom'
import Validation from '../Components/Validation'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaPhoneFlip, FaRegAddressCard, FaUserPlus, FaAt } from 'react-icons/fa6'

const AddContact = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);

  const navigate = useNavigate();
  const handleInput = (event) => {
    const { name, value } = event.target;

    const updatedValue =
      name === "phone" ? value.replace(/\D/g, "") : value;

    setValues({
      ...values,
      [name]: updatedValue
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Validation(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem('token');

    axios.post(
      'https://contact-mng-server.onrender.com/contactmng/add-contact',
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      toast.success("Contact Added Successfully");
      navigate('/dashboard');
    })
    .catch(err => {
      console.log(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className='add-form-container'>
      <form className='add-form' onSubmit={handleSubmit}>

        <h2>Create New Contact</h2>

        {/* NAME */}
        <div className='form-group'>
          <FaUserPlus />
          <input
            type="text"
            name="name"
            value={values.name}
            placeholder='Enter Name'
            onChange={handleInput}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* EMAIL */}
        <div className='form-group'>
          <FaAt />
          <input
            type="email"
            name="email"
            value={values.email}
            placeholder='Enter Email'
            onChange={handleInput}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* PHONE */}
        <div className='form-group'>
          <FaPhoneFlip />
          <input
            type="text"
            name="phone"
            value={values.phone}
            placeholder='Enter Phone Number'
            maxLength={10}
            onChange={handleInput}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* ADDRESS */}
        <div className='form-group'>
          <FaRegAddressCard />
          <input
            type="text"
            name="address"
            value={values.address}
            placeholder='Enter Address'
            onChange={handleInput}
          />
        </div>

        <button className='form-btn'>Add Contact</button>

      </form>
    </div>
  );
};

export default AddContact;
import React, { useEffect, useState } from 'react'
import '../assets/css/form.css'
import { useNavigate, useParams } from 'react-router-dom'
import Validation from '../Components/Validation'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaPhoneFlip, FaRegAddressCard, FaUserPlus, FaAt } from 'react-icons/fa6'

const EditContact = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Validation(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem('token');

    axios.put(
      `https://contact-mng-server.onrender.com/contactmng/update-contact/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      if (res.data.success) {
        toast.success("Updated Successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        navigate('/dashboard'); 
      }
    })
    .catch(err => {
      console.log(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err.response?.data?.errors) {
        setServerErrors(err.response.data.errors);
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.get(
      `https://contact-mng-server.onrender.com/contactmng/contacts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      if (res.data.success) {
        setValues({
          name: res.data.contact.name || "",
          email: res.data.contact.email || "",
          phone: res.data.contact.phone || "",
          address: res.data.contact.address || ""
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  }, [id]);
  return (
    <div className='add-form-container'>
      <form className='add-form' onSubmit={handleSubmit}>

        <h2>Edit Existing Contact</h2>
        <div className='form-group'>
          <FaUserPlus />
          <input
            type="text"
            placeholder='Enter Name'
            name='name'
            value={values.name}
            onChange={handleInput}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className='form-group'>
          <FaAt />
          <input
            type="email"
            name="email"
            placeholder='Enter Email'
            value={values.email}
            onChange={handleInput}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/*  PHONE */}
        <div className='form-group'>
          <FaPhoneFlip />
          <input
            type="text"
            name='phone'
            placeholder='Enter Phone Number'
            value={values.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // ✅ allow only digits
              setValues({ ...values, phone: value });
            }}
            maxLength={10}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/*  ADDRESS */}
        <div className='form-group'>
          <FaRegAddressCard />
          <input
            type="text"
            name='address'
            placeholder='Enter Address'
            value={values.address}
            onChange={handleInput}
          />
        </div>

        {/* SERVER ERRORS */}
        {
          serverErrors.length > 0 &&
          serverErrors.map((error, index) => (
            <p key={index} className='error'>{error.msg}</p>
          ))
        }

        <button className='form-btn'>Update Contact</button>

      </form>
    </div>
  );
};

export default EditContact;
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ContactCard = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null); 
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`https://contact-mng-server.onrender.com/contactmng/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data.success) {
        setContact(res.data.contact);
      }
    })
    .catch(err => console.log(err));

  }, [id]);
useEffect(() => {
  if (contact) {
    fetchNotes(contact._id);
  }}, [contact]);
  if (!contact) return <h2>Loading...</h2>;
  return (
    <>
    <div style={{ padding: "20px" }}>
      <h2>Contact Details</h2>
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", width: "300px"}}>
        <p><b>Name:</b> {contact.name}</p>
        <p><b>Email:</b> {contact.email}</p>
        <p><b>Phone:</b> {contact.phone}</p>
        <p><b>Address:</b> {contact.address}</p>
      </div>
    </div>
</>)}
export default ContactCard;
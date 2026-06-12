import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://127.0.0.1:3000/contactmng/verify', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data.success) {
        setUser(res.data.user);
      }
    })
    .catch(err => console.log(err));

  }, []);

  if (!user) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>

      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        width: "300px"
      }}>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>
    </div>
  )
}

export default Profile;

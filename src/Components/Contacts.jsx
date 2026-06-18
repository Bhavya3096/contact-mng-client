import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import { CircleLoader } from 'react-spinners';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);
const customStyles = {
  headCells: {style: {fontSize: "15px", fontWeight: 600,},},
  cells: {style: { fontSize: "13px", fontWeight: 500,},},
pagination: {style: {display: "flex", justifyContent: "center", alignItems: "center"}},};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const deleteRecord = (id) => {
    const token = localStorage.getItem('token');
    MySwal.fire({
      title: "Are you Sure?",text: "You won't be able to revert this!",
      icon: "warning",showCancelButton: true,
      confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/contactmng/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }})
        .then(() => {
          setContacts(prev => prev.filter(c => c._id !== id));
          if (selectedContact && selectedContact._id === id) {setSelectedContact(null); }
          MySwal.fire({
            title: "Deleted!", text: "Contact deleted successfully.",icon: "success"});
        })
        .catch(err => {
          console.log(err);
          MySwal.fire("Error!", "Something went wrong!", "error");
        });
      }
    });
  };
  const columns = [
    {
  name: 'Name',
  cell: (row) => ( 
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${row.name}`} alt="avatar"
        style={{width: "35px", height: "35px", borderRadius: "50%"}} />
      <span onClick={() => setSelectedContact(row)}>{row.name}</span>
    </div>
  )
},
{
  name: 'Action',
  cell: (row) => (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <Link to={`/dashboard/edit-contact/${row._id}`}><FaPenToSquare className='table-icon1'style={{ color: "green", cursor: "pointer" }}/></Link>
      <FaRegTrashCan className='table-icon2' style={{ color: "red", cursor: "pointer" }}onClick={() => deleteRecord(row._id)}/>
    </div>
  )
},
];
  useEffect(() => {if (selectedContact) {fetchNotes(selectedContact._id);}}, [selectedContact]);
  const fetchNotes = (contactId) => {
  const token = localStorage.getItem('token');

  axios.get(`${import.meta.env.VITE_API_BASE_URL}/contactmng/notes/${contactId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    if (res.data.success) {
      setNotes(res.data.notes);
    }
  });
};

const handleAddNote = () => {
  if (!note.trim()) return;
  const token = localStorage.getItem('token');
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/contactmng/add-note`, {
    contactId: selectedContact._id, note}, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(() => {
    setNote("");
    fetchNotes(selectedContact._id);
  });
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/contactmng/contacts`, {
      headers: {Authorization: `Bearer ${token}`}})
    .then((res) => { if (res.data.success) {setContacts(res.data.contacts || []);}
      setLoading(false);
    })
    .catch(err => {console.log(err);
      setLoading(false);});}, []);
  return (
    <>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}><CircleLoader size={50} /></div>) : (
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
          <div style={{ flex: selectedContact ? 2 : 1,transition: "all 0.3s ease"}}>
            <DataTable
              columns={columns}
              data={contacts}
              customStyles={customStyles}
              pagination
              paginationDefaultPage={5} 
             paginationRowsPerPageOptions={[3,5,10,15,20,25,30]}/>
            {contacts.length === 0 && (<h3 style={{ textAlign: "center" }}>No contacts found. Add a contact.</h3>)}
          </div>
          {selectedContact && (
            <div style={{flex: 1,border: "1px solid #ccc",padding: "20px",borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)",height: "fit-content", animation: "fadeIn 0.3s ease" }}>
              <h3>Contact Details</h3>
              <p><b>Name:</b> {selectedContact.name}</p>
              <p><b>Email:</b> {selectedContact.email}</p>
              <p><b>Phone:</b> {selectedContact.phone}</p>
              <p><b>Address:</b> {selectedContact.address}</p>
              <button style={{ marginTop: "10px",padding: "5px 10px",cursor: "pointer"}}onClick={() => setSelectedContact(null)}>Close</button>
              <h4>Notes</h4>
              <input type="text" value={note} placeholder="Add note..." onChange={(e) => setNote(e.target.value)}/>
              <button onClick={handleAddNote}>Add Note</button>
              <div>{notes.length > 0 ? ( notes.map((n, index) => ( <p key={index}>• {n.note}</p>))) : (<p>No notes added</p>)}</div>
            </div>)}
          </div>)}</>);};
export default Contacts;
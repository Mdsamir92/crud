import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";


function Update() {
  const { id } = useParams();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
// get user from local storage 
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setPhone(localStorage.getItem("phone"));
  }, []);

  // useEffect(() => {
  
  //   axios.get(
  //     `https://sam-crud.onrender.com/api/read/${id}`,
  //     {
  //       name: name,
  //       email: email,
  //       phone: phone,
  //     })
  //     .then((res) => {
  //       console.log(res.data)
  //     })

  // })


  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `https://sam-crud.onrender.com/api/update/${id}`,
      {
        name: name,
        email: email,
        phone: phone,
      }
    ).then(() => {
      toast.success("Update successfully...")
      navigate("/read");
    });
  }

  return (
    <div>
      <h2>Update Data</h2>
      <div className='form-container'>

        <form >
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder='enter name...' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder='enter email...' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="number" className="form-control" maxLength="10"   placeholder='enter number...' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Check me out</label>

          </div>
          <button type="submit" className="btn btn-warning mx-2" onClick={handleSubmit} >Update</button>
          <Link to="/read">
            <button className='btn btn-warning mx-2 my-2' >Back</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Update;

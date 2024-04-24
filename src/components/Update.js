import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import Swal from "sweetalert2"

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

        if (!name || !email || !phone) {
      Swal.fire({ icon: "error", title: "Oops", text: "please fill data..." })
      return;
    } else if (name.length < 3) {
      Swal.fire({ icon: "error", title: "Oops", text: "Name requires a minimum of 3 characters" });
      return;
    } else if (email.length < 13) {
      Swal.fire({ icon: "error", title: "Oops", text: "Enter a valid email address" });
      return;
    }
    else if (phone.length < 10) {
      Swal.fire({ icon: "error", title: "Oops", text: "number requires a minimum of 10  digits" });
      return;
    }
    else {
      Swal.fire({ icon: "success", title: "wow", text: "Update successfully..." })

    }
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
   
      <div className='form-container'>
         <h2>Update Data</h2>
        <form >
          <div className="mb-3">
            <label className="form-label">Name</label> <br/>
            <input type="text"  placeholder='enter name...' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email"  placeholder='enter email...' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label><br/>
           <input type="number" placeholder='Enter number...' value={phone} onChange={(e) => setPhone(e.target.value.slice(0,10))} required />
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

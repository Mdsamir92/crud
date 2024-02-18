import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2"

function Create() {

  const navigate = useNavigate("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name || !email || !phone){
      Swal.fire({icon:"error",title:"Oops",text:"please fill data..."})
     return;
    }   else if(name.length<3){
      Swal.fire({icon:"error",title:"Oops",text:"Name requires a minimum of 3 characters"});
      return;
    }else if (email.length < 13) { 
      Swal.fire({icon:"error",title:"Oops",text:"Enter a valid email address"});
      return;
    }
    else if (phone.length < 10) {
      Swal.fire({icon:"error",title:"Oops",text:"number requires a minimum of 10  digits"});
      return ;
    }
    else{
      Swal.fire({icon:"success",title:"wow",text:"submit successfully..."})
    }
 
    axios.post(
      'https://sam-crud.onrender.com/api/create',
      {
        name: name,
        email: email,
        phone: phone,
      }
    ).then(() => {
      navigate("/read");
    });

  }

  return (
    <div>

      <div className='home-btn d-flex justify-content-between m-3'>


        <div >
        <Link to="/read">
          <button className='btn btn-warning mx-3'>Read Data</button>
        </Link>
        <Link to="/upload">
          <button className='btn btn-warning'>Upload Image </button>
        </Link>
        </div>
     
      </div>

       <div className='form-container'>
       <h2>Create Data</h2>
        <form >
          <div>
            <label className="form-label">Name</label> <br/>
            <input type="name"  placeholder='Enter name...' onChange={(e) => setName(e.target.value)}  required/> 
          </div>
          <div>
            <label className="form-label"  >Email address</label>
            <input type="email"  placeholder='Enter email...' onChange={(e) => setEmail(e.target.value)} required  />
          </div>
          <div>
            <label className="form-label">Phone </label> <br/>
            <input type="number"  placeholder='Enter number...' onChange={(e) => setPhone(e.target.value)} required  />
          </div>
     
          <button type="submit" className='reg-btn' onClick={handleSubmit}>Submit</button>
        </form>
       
      </div>
    </div>
  )
}

export default Create;

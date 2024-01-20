import React, { useState } from "react";
import axios from "axios"
import "./Signup.css";
import {useNavigate ,Link} from 'react-router-dom';
import {toast} from "react-toastify"


function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");


const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!name || !email || !password) {
      toast.error("Enter valid name, email & password 🙁");
      return;
   }
  else if(name.length<3){
     toast.error("Name requires a minimum of 3 characters");
     return;
   }
   else if (password.length < 5) {
     toast.error("Password requires a minimum of 5 characters");
     return ;
   }
  

  
   axios.post("https://login-register-form-go9w.onrender.com/register", 
   { name,email,password }

  ).then(() => {
    toast.success("Register successfully😍")
    navigate("/");
  })
   
  .catch(() => {
     
    if (!name || !email || !password) {
      toast.error("Enter valid name, email & password 🙁");
      return;
   }
   
   else
     {
      toast.error("Email already registered 🙁");
      return ;
     }
})



}


  return (
    <div className='form-container'>
   <h2>SignUp</h2>

   <div class="social-icons">
        <a href="#" ><i class="fa-brands fa-google"></i> </a>
        <a href="#" ><i class="fa-brands fa-facebook"></i> </a>
        <a href="#" ><i class="fa-brands fa-github"></i> </a>
    
      </div>
      <form>
        <label>Name:</label> <br />
        <input type="text" value={name} className="form-control" placeholder="enter name" onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email:</label> <br />
        <input type="email" value={email} className="form-control" placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label> <br />
        <input type="password" value={password} className="form-control" placeholder="enter password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        {/* <p style={{ color: "red" }}>{error && error}</p> */}
       
       <button type="submit" onClick={handleSubmit} className='reg-btn'>Register</button>
     
      </form>
      <br />
      <Link to="/">Login with existing account</Link>
    </div>
  )
}

export default Signup

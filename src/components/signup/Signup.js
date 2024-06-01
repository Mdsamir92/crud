import React, { useState } from "react";
import axios from "axios"
import "./Signup.css";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify"


function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      // validate using regex 
   let emailRegex = /^[A-Za-z]+[\d]+[@]+[gmail]+[.]com$/.test(email);

    if (!name || !email || !password) {
      toast.error("Enter valid name, email & password 🙁");
      return;
    }
    else if (name.length < 3) {
      toast.error("Name requires a minimum of 3 characters");
      return;
    } else if (email.length < 14 || !emailRegex) {
      toast.error("Enter a valid email address or use @gmail.com");
      return;
    }
    else if (password.length < 5 ) {
      toast.error("Password requires a minimum of 5 characters");
      return;
    }

    setLoading(true)
    axios.post("https://login-register-form-go9w.onrender.com/register",
      { name, email, password }

    ).then(() => {
      toast.success("Register successfully😍")
      navigate("/");
    })

      .catch(() => {
      toast.error("Email already registered 🙁");
  
      })



  }


  return (
    <div className='form-container'>
   
      <h2>  {loading ? "processing" : "Register🖥"}</h2>

      <form>
        <label>Name:</label> <br />
        <input type="text" value={name}  placeholder="enter name" onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Email:</label> <br />
        <input type="email" value={email}  placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label> <br />
        <input type="password" value={password}   placeholder="enter password" onChange={(e) => setPassword(e.target.value)} />
        <br />

        <button type="submit" onClick={handleSubmit} className='reg-btn'>Register</button>

      </form>
  
      <Link to="/">Login with existing account</Link>
    </div>
  )
}

export default Signup

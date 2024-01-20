import React, { useState } from "react";
import "./Login.css"
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify"

function LoginForm() {



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error,setError] = useState("");

  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://login-register-form-go9w.onrender.com/login",
        { email, password },)


      if (res.data) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.email);
        toast.success("Login successfully 😍 ")
        navigate("/home");
      }
    }

    catch (error) {
      if (!email || !password) {
        toast.error("enter valid email & password  🙁");
      }
      else {
        toast.error("please check email & password or register than login🙁")
      }
      console.log(error)

    }


  }


  return (
    <div className='form-container'>
      <h2>SignIn</h2>

      <div class="social-icons">
        <a href="#" ><i class="fa-brands fa-google"></i> </a>
        <a href="#" ><i class="fa-brands fa-facebook"></i> </a>
        <a href="#" ><i class="fa-brands fa-github"></i> </a>
       
      </div>
      <form>
        <label>Email:</label> <br />
        <input type="text" value={email} placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label> <br />
        <input type="password" value={password} placeholder="enter password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit" onClick={handleSubmit} className='login-btn'>Login</button>
       
      </form>
      <br />
      <Link to="/signup">New user signup here</Link>
    </div>
  );
}

export default LoginForm

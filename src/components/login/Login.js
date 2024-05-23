import React, { useState } from "react";
import "./Login.css"
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify"


function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      setLoading(true)
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
    <div className='form-container '>

      <h2>  {loading ? "processing" : "Login💻"}</h2>


      <form>
        <label>Email:</label> <br />
        <input type="text" value={email} required  placeholder="enter email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label> <br />
        <input type="password" value={password} required placeholder="enter password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input class="checkbox" type="checkbox" required /> Keep me signed in 
        <button type="submit" onClick={handleSubmit} className='login-btn'>Login</button>
       
      </form>
 
      <Link to="/signup">Dont't have an account ? signup here</Link>
    </div>
  );
}

export default LoginForm

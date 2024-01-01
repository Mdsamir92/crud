import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"

function Welcome() {
    const username = localStorage.getItem("username");
    const token =  localStorage.getItem("token")
  
    const navigate = useNavigate();
    
    const [tokenData, setTokenData] = useState({
        token
    })


    const logout = async (e) => {
        const res = await axios.post("https://login-register-form-go9w.onrender.com/logout", tokenData)
        if (res.data) {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            toast.success("Logout successfully 😍")
            navigate("/")
        } else {
            alert("logout failed")
        }
    }

    return (
        <div>
           {/* <span style={{ textAlign: "center" }}><h1>Welcome {username} </h1></span> */}
            {/* <button className='btn-logout' onClick={logout}>Logout</button> */}
            <button className='btn btn-primary ml-4 ' onClick={logout}>Logout</button>

        </div>
    )
}

export default Welcome
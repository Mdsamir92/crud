import React,{useEffect,useState} from "react";
import Create from "./Create";
import Read from "./components/Read";
import Update from "./components/Update";
import { BrowserRouter,Routes,Route}
from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Signup from "./components/signup/Signup";
import LoginForm from "./components/login/Login";
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Upload from "./components/Upload";



function App() {


  
  return (
    <div>
   <BrowserRouter>
     <Routes>
          <Route exact path="/home" element={<Create />}> </Route>
          <Route exact path="/read" element={<Read />}> </Route>
          <Route exact path="/update/:id" element={<Update />}> </Route>
          <Route  path="/signup" element={<Signup/>}> </Route>
          <Route  path="/" element={<LoginForm/>}> </Route>  
       <Route  path="/upload" element={<Upload/>}> </Route>  
       </Routes>
      </BrowserRouter>
      <ToastContainer position='top-right' theme="colored" 
       autoClose={2000} bodyClassName="toastBody"
      />
    </div>
  );
}

export default App;


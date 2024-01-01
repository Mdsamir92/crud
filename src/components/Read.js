import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Welcome from '../Welcome';
import { toast } from "react-toastify"


function Read() {

  const [data, setData] = useState([]); // for display and read our data
  const [input, setInput] = useState(""); //for search name
  const [tabledark, setTabledark] = useState(); //for dark mode


  const navigate = useNavigate();

  const getData = async () => {
    try {
      let res = await fetch("https://sam-crud.onrender.com/api/read");
      res = await res.json();
      setData(res.data)

    } catch (error) {
      console.log(error)
    }

  }

   

useEffect(()=>{

  getData();

},[])



  function handleDelete(id) {
    axios.delete(`https://sam-crud.onrender.com/api/delete/${id}`)
      .then(() => {
        toast.success("Delete successfully...")
        getData();
      });
  }

  // set user in local storage 
  const setToLocalStorage = ( name, email, phone) => {

    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("phone", phone)

  }

  const inputHandler = (e) => {
    setInput(e.target.value.toLowerCase());
  }

//token
const token =  localStorage.getItem("token");
console.log(token);

useEffect(() => {
 if(token===null){
   navigate("/")
 }

},[]);


  return (
    <div>
      {/* Darkmode */}
      <div className='for-check form-switch m-3'>
        <input className='form-check-input' type="checkbox"
          onClick={() => {
            if (tabledark === 'table-dark') setTabledark("")
            else setTabledark("table-dark")

          }}
        />

      </div>
      <div className='create mb-3 mx-4' >
   
          <input style={{width:"30%",position:"absolute",left:"35%"}} type="search" placeholder="Search..." className='form-control' onChange={inputHandler} />
       
         {/* for logout  */}
          <span><Welcome/></span>
      
          <Link to="/home">
          <button style={{background:"black",color:"white",position:"absolute",top:"13%",left:"80%"}} className='btn '>Create</button> 
        </Link>
      
        </div>


      <div className='d-flex justify-content-between  mx-4'>
   
        <h3>Read Data  </h3>

      </div>
      <div className=' col-md-10 col-8 mx-3'>
        <table className={`table ${tabledark}`} >
          <thead>
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col"> Name</th>
              <th scope="col">Email</th>
              <th scope="col">Number</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>

          {/* for search name email and number */}

          {data.filter((el) => {
            if (el === "") {
              return el;
            }
            else {
              return (el.name.toLowerCase().includes(input)) ||
                (el.email.toLowerCase().includes(input)) || (el.phone.includes(input))
            }
          }).map((eachData, i) => {
            return (
              <>
                <tbody>
                  <tr key={i}>
                    {/* <td>{eachData._id}</td> */}
                    <td>{eachData.name}</td>
                    <td>{eachData.email}</td>
                    <td>{eachData.phone}</td>

                    <td>
                      <Link to={`/update/${eachData._id}`}>
                      <button className='btn btn-primary'  
                      onClick={() => setToLocalStorage ( eachData.name, eachData.email, eachData.phone)} >🖊</button>
                      </Link>
                    </td>

                    <td>
                      <button className='btn btn-warning' onClick={() => handleDelete(eachData._id)}>🗑</button>
                    </td>

                  </tr>
                </tbody>
              </>
            )
        })
          }
        </table>
      </div>

    </div>
  )
}

export default Read;

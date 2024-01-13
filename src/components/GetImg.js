import React, { useState, useEffect } from 'react'
import axios from "axios"
import { toast } from "react-toastify"

function GetImg() {
  const [img, setImg] = useState([]);

  const getData = async () => {
    try {
      let res = await axios.get("https://sam-crud.onrender.com/api/getimg");
      setImg(res.data.data)

    } catch (error) {
      console.log(error)
    }

  }

  function handleDelete(id) {
    axios.delete(`https://sam-crud.onrender.com/api/del/${id}`)
      .then(() => {
        toast.success("Delete successfully...")
        getData();
      });
  }

  useEffect(() => {

    getData();

  }, [])


  return (
    <div className='container row d-flex justify-content-center  align-items-center'>


        {img.map((eachData, i) => {

          return(
            
            <div key={i} className="card card_style" style={{width:"16rem",height:"17rem",padding:"10px",margin:"20px 15px"}}>
                <img height={200} src={`https://sam-crud.onrender.com/img/${eachData.image}`} alt="..." />
                <button className='btn btn-warning' onClick={() => handleDelete(eachData._id)}>Delete</button>

            </div>  

                   
          )
      
        })
       
        }
    

    </div>
  )
}

export default GetImg

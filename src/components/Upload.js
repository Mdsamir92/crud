import React, { useState ,useEffect} from 'react'
import axios from "axios"
import GetImg from './GetImg'
import { toast } from "react-toastify"

function Upload() {

    const [file, setFile] = useState(null)

    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", file)

        axios.post(" https://sam-crud.onrender.com/api/upload", formData)
            .then((res) => {
                console.log(res.data);
            //    toast.success("Upload successfully 😍 ");
               location.reload();
            })

    }



    return (
        <div> 
         
         <h2> Upload Image</h2>
            <div className='img-container'>
           
              <input type="file" name='file' onChange={(e) => setFile(e.target.files[0])} /> <br/>
               
                <button className='btn btn-warning' onClick={uploadImage}>Upload </button>
              
            </div>

            <GetImg/>
        </div>
    )
}

export default Upload;

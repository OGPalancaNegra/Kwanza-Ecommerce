import React, { useEffect, useState } from 'react'
import background1 from "../images/background4.jpg"
import { publicRequest } from '../axios'
import { registerAdmin } from '../redux/apiCalls'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {

    const [windowSize, updateWindowSize] = useState(window.innerWidth)
    const [adminObj, updateAdmin] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [img, updateImg] = useState("")

    const dispatch = useDispatch()
 
   
    const navigate = useNavigate()

   /*  useEffect(()=>{
        window.addEventListener("resize", ()=>{
            updateWindowSize(window.innerWidth)
        })
    },[windowSize]) */


 const handleInput = (e) =>{
   
        updateAdmin((oldData)=>{
           
            return {
                ...oldData,
                [e.target.name]: e.target.value}
            })
           
        }

    const handleImage = (e)=>{
        const [file] = e.target.files
        updateImg(URL.createObjectURL(file))
    }


  const sendRequest = (e)=>{
      e.preventDefault()
      console.log("button clicked")
      registerAdmin(adminObj, img, dispatch, navigate)
      
  }


  return (

        <div className='app row horz-center vert-center' style={{backgroundImage:`url(${background1})`}}>
            <form className='form column vert-center sm-gap' encType="multipart/form-data">
                <div className='add-image row' >
                
                    <img src={img}></img>
                
                    {/*  <p className='sm-text'>Add Image</p> */}
                
                </div>
                <input accept='image/*' type="file" name='image' onChange={handleImage} />
                
                
                <input type="text" placeholder='username' name ="username" onChange={handleInput} />
                <input type="email" placeholder='email' name="email" onChange={handleInput} />
                <input type="password"  id="" placeholder='123' name="password" onChange={handleInput} />
                <button onClick={sendRequest}>Register</button>
            </form>
        </div>
    
  )
}


export default Register


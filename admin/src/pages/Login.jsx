import React,  { useEffect, useState } from 'react'
import background1 from "../images/background4.jpg"
import { publicRequest } from '../axios'
import { createAdmin, requestNewPassword, registerAdmin } from '../redux/apiCalls'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/apiCalls'
import axios from 'axios'

const Login = () => {
    
    const [windowSize, updateWindowSize] = useState(window.innerWidth)
    const [adminObj, updateAdmin] = useState({
        email: "",
        password: "",
    })

    const [newPassEmail, setNewPassEmail] = useState("")

    const [forgotPass, setForgotPass] = useState(false)

  
    
    const navigate = useNavigate()

    const dispatch = useDispatch()


 const handleInput = (e) =>{
   
        updateAdmin((oldData)=>{
           
            return {
                ...oldData,
                [e.target.name]: e.target.value}
            })
           
        }

    console.log(adminObj)

   

  const sendRequest = (e)=>{
      e.preventDefault()
      console.log("making post request...")
      loginUser(adminObj, navigate, dispatch)
  }


  const handleInput2 = (e)=>{
    setNewPassEmail(e.target.value)
  }


  const sendForgotRequest = (e)=>{
      //
      e.preventDefault()
      requestNewPassword(newPassEmail)
      
  }


  console.log(forgotPass)
  console.log(newPassEmail)

 


  return (
    <div className='app row horz-center vert-center' style={{backgroundImage:`url(${background1})`}}>
    
    
    <form className='form column vert-center sm-gap' encType="multipart/form-data">

    {!forgotPass ? <>
        <input type="email" placeholder='teu_nome@hotmail.com' name ="email" onChange={handleInput} />
      
        <input type="password"  id="" placeholder='***' name="password" onChange={handleInput} />
        <a onClick={()=>setForgotPass(true)}>Forgot Password?</a>
        <button onClick={sendRequest}>Login</button>
    </> : <>
      <input type="email" placeholder='teu_nome@hotmail.com' name ="emailForPass" onChange={handleInput2} />
      <a onClick={()=>setForgotPass(false)}>Remembered Password?</a>
      <button onClick={sendForgotRequest}>Get New Password</button>
    </> }
        
    </form>

    



</div>
  )
}

export default Login

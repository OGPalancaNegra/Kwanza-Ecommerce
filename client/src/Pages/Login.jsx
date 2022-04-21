import React from 'react'
import Navbar from '../Components/Navbar'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postLogin } from '../Redux/apiCalls'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [userData, setData] = useState({
    email:"",
    password:""
  })

  const dispatch = useDispatch()
  const navigate= useNavigate()

const storeUserData = (e)=>{
  console.dir(e.target.type)
  const type = e.target.type
  setData((oldData)=>{
    return {
      ...oldData,
      [e.target.name] : type === "checkbox" ? e.target.checked : e.target.value
    }
  })
}



const login = (e)=>{
  // login with password????
  e.preventDefault()
  postLogin(userData, dispatch, navigate)

  // call authenticate???


}

  return (
    <>
    <>
      <Navbar></Navbar>
      <div className='content-container'>
          <h2>Login Page</h2>
          <form className='register-form center-el column md-gap light-grey-border lg-padd' action="">
              <label htmlFor="email">Email</label>
              <input onChange={storeUserData} type="text" name="email" id="email" className='light-grey-border xsm-padd' placeholder='your_name@hotmail.com'/>
             
              <label htmlFor="password">Password</label>
              <input onChange={storeUserData} type="password" name="password" id="password" className='light-grey-border xsm-padd' placeholder='***' />
              <label htmlFor="recieveEmails" className='sm-text'>Recieve Emails?</label>
             
              <button onClick={login} className='sm-padd'>Login</button>
          </form>
      </div>
    </>
</>
  )
}

export default Login

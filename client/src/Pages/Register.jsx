import React from 'react'
import Navbar from '../Components/Navbar'
import { useState } from 'react'
import { postUserData } from '../Redux/apiCalls'
import { useDispatch } from 'react-redux'
import { storeUserInRedux } from '../Redux/userRedux'
import { Navigate, useNavigate } from 'react-router-dom'


const Register = () => {

  const [userData, setData] = useState({
    name:"",
    email:"",
    password:"",
    recieveEmails: false
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

console.log(userData)


  const register = (e)=>{
    e.preventDefault()
    postUserData(dispatch,userData) 
    navigate("/")
  }


  return (
    <>
        <Navbar></Navbar>
        <div className='content-container'>
            <h2>Register Page</h2>
            <form className='register-form center-el column md-gap light-grey-border lg-padd' action="">
                <label htmlFor="name">Name</label>
                <input onChange={storeUserData} type="text" name="name" id="name" className='light-grey-border xsm-padd' placeholder='name'/>
                <label htmlFor="email">Email</label>
                <input onChange={storeUserData} type="email" name='email' id='email' className='light-grey-border xsm-padd' placeholder='your_name@hotmail.com'/>
                <label htmlFor="password">Password</label>
                <input onChange={storeUserData} type="password" name="password" id="password" className='light-grey-border xsm-padd' placeholder='***' />
                <label htmlFor="recieveEmails" className='sm-text'>Recieve Emails?</label>
                <input onChange={storeUserData} type="checkbox" name="recieveEmails"  id="recieveEmails" />
                <button onClick={register} className='sm-padd'>Register</button>
            </form>
        </div>
    </>
  )
}

export default Register

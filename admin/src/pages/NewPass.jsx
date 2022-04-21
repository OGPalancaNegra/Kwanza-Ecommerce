import React,  { useEffect, useState } from 'react'
import background1 from "../images/background4.jpg"
import { publicRequest } from '../axios'
import { createAdmin, postNewPassword, registerAdmin } from '../redux/apiCalls'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/apiCalls'
import axios from 'axios'
import { storeAdmin } from '../redux/adminRedux'


const NewPass = () => {
    


    const [newPass, setNewPass] = useState("")
    const [foundEmail, setEmail] = useState("")

   const userId = useLocation().pathname.split("/")[2]
   const tokenId = useLocation().pathname.split("/")[3]


   console.log(userId)
   console.log(tokenId)

   useEffect(()=>{
        const getUser = async ()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/admin/${userId}`)
                setEmail(res.data)
              
            } catch {
                console.log("couldnt get found user info")
            } 
        }
        getUser()
   },[])



  
    // get email with ID to set to first input
    
    const navigate = useNavigate()

    const dispatch = useDispatch()


    const handleInput2 = (e)=>{
        setNewPass(e.target.value)
      }


  const sendRequest = (e)=>{
      e.preventDefault()
      console.log("making post request...")
      postNewPassword(userId, tokenId, newPass, dispatch, navigate)
    
  }

  return (
    <div className='app row horz-center vert-center' style={{backgroundImage:`url(${background1})`}}>
    
    
    <form className='form column vert-center sm-gap' encType="multipart/form-data">


        <input type="email" value={foundEmail}  />
      
        <input type="password"  id="" placeholder='***' name="password" onChange={handleInput2} />
      
        <button onClick={sendRequest}>Confirm New Password</button>
   
        
    </form>
</div>
  )
}

export default NewPass
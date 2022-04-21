import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../Components/Navbar'

const Orders = () => {

    const forToken = useSelector(state=>state.user)

    //get all orders matching userId
    const [userOrders, setOrders]= useState([])

    const userId = useSelector(state=>state.user._id)
    console.log(userId)
    useEffect(()=>{
        const getUserId = async ()=>{
            try {
                /* http://localhost:5000/api/client/login */
                const res = await axios.get(`http://localhost:5000/api/order/${userId}`, {headers: {userId: forToken._id}})
                setOrders(res.data)
            } catch {
                console.log("no orders found")
            }
        }
        getUserId()
    },[])

    console.log(userOrders)

  return (
    <>
        <Navbar></Navbar>
        <div className="content-container">
            <h1>Order Page</h1>
        {/* amount quantity date */}
            <div className="column orders lg-gap">
                {userOrders && userOrders.map(el=>{
                    return <div className="order-div row light-grey-border md-padd sp-btw text-center vert-center">
                        <p><b>Amount: </b>{el.amount}</p>
                        <p><b>Quanitity: </b>{el.quantity}</p>
                        <p><b>Date: </b>{new Date(el.createdAt).toLocaleDateString()}</p>
                    </div>
                })}
            </div>

        </div>
        
    </>
  )
}

export default Orders

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Page from './Page'


const Orders = () => {

    const [monthlyIncome, setMonthlyIncome] = useState([])
    const [allOrders, setOrders] = useState([])

    const forToken = useSelector(state=>state.currentAdmin)
  

    const navigate = useNavigate()

     if (!forToken) {
        navigate("/login")
    }

    useEffect(()=>{
     
      const getAllOrders = async ()=>{
        try {
          const res = await axios.get("http://localhost:5000/api/order/orders",{headers: {token:forToken.accessToken, userId: forToken._id}})
          setOrders(res.data)
        } catch {
          console.log("failed getting all orders")
        }
      }
      getAllOrders()

    },[])

  return (
      <>
      <Page></Page>
      <div className='main-content right-section'>
        <h3>Every Order</h3>

        <div className="orders column md-gap">
            {allOrders.map(el=>{
                return <div className="order-div row sp-btw sm-text">
                    <p>{el._id}</p>
                    <p>{el.email}</p>
                    <p>{el.quantity}</p>
                    <p>{el.amount}</p>
                    <p>{new Date(el.createdAt).toLocaleDateString()}</p>
                </div>
            })}
        </div>
      </div>
      </>
    
  )
}

export default Orders

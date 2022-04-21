import React, { useEffect, useState } from 'react'
import MainInfo from '../components/MainInfo'
import SalesChart from '../components/SalesChart'
import LatestOrders from '../components/LatestOrders'
import Page from "./Page"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Dashboard = ({products}) => {

  const [monthlyIncome, setMonthlyIncome] = useState([])
  const [allOrders, setOrders] = useState([])
  const [mostOrdered, setMostOrdered] = useState([])
  const navigate = useNavigate()

  const forToken = useSelector(state=>state.currentAdmin)

  if (!forToken) {
    navigate("/login")
  }

 // console.log(User.accessToken)
  useEffect(()=>{
    const getMontlyIncome = async () =>{
      try {
        const res = await axios.get("http://localhost:5000/api/order/income", {headers: {token:forToken.accessToken, userId: forToken._id}})
        setMonthlyIncome(res.data)
      }catch {
        console.log("couldnt get montly income")
      }
    }

    const getAllOrders = async ()=>{
      try {
        const res = await axios.get("http://localhost:5000/api/order/orders",{headers: {token:forToken.accessToken, userId: forToken._id}})
        setOrders(res.data)
      } catch {
        console.log("failed getting all orders")
      }
    }

    const getTop5 = async ()=>{
      try {
        const res = await axios.get("http://localhost:5000/api/order/mostOrdered",{headers: {token:forToken.accessToken, userId: forToken._id}})
        setMostOrdered(res.data)
      } catch {
        console.log("failed getting all orders")
      }
    }



    getMontlyIncome()
    getAllOrders()
    getTop5()
  },[])

  console.log(monthlyIncome)
  console.log(allOrders)



  return (
    <>
        <Page></Page>
        <div className='main-content right-section'>
             <h2>Dashboard</h2>
            <MainInfo monthlyIncome= {monthlyIncome} allOrders= {allOrders} products={products}></MainInfo>
            <SalesChart monthlyIncome={monthlyIncome}></SalesChart>
            <LatestOrders allOrders={allOrders} mostOrdered = {mostOrdered}></LatestOrders>
         </div> 
         </>   
  )
}
export default Dashboard

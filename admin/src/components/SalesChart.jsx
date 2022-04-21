import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useSelector } from 'react-redux'

const SalesChart = ({monthlyIncome}) => {


    const data = [{name: 'jan', sales: 200},{name: 'feb', sales: 233},{name: 'mar', sales: 320 }, {name: 'apr', sales: 289 }, {name: 'may', sales: 233 },{name: 'june', sales: 123 },{name: 'july', sales: 391 },{name: 'aug', sales: 333 },{name: 'sep', sales: 280 },{name: 'oct', sales: 420 },{name: 'nov', sales: 400 },{name: 'dec', sales: 411 }]
    const [mostPopular, setPopular] = useState([])
    const [mostOrdered, setMostOrdered] = useState([])
    console.log(monthlyIncome)

    console.log(useSelector(state=>state.currentAdmin))
    const forToken = useSelector(state=>state.currentAdmin)

   

    useEffect(()=>{
      const getMostPopular = async ()=>{
        const res = await axios.get("http://localhost:5000/api/product/products?mostPopular=true",{headers: {token:forToken.accessToken, userId: forToken._id}})
        setPopular(res.data)
      }

      const getTop5 = async ()=>{
        try {
          const res = await axios.get("http://localhost:5000/api/order/mostOrdered",{headers: {token:forToken.accessToken, userId: forToken._id}})
          setMostOrdered(res.data)
        } catch {
          console.log("failed getting all orders")
        }
      }

      getMostPopular()
      getTop5()
      
    },[])

    console.log(mostPopular)


  return (
      <div className='row sm-gap'>
        <ResponsiveContainer width={'66.3%'} height={250}>
            <BarChart className='bar-chart' data={monthlyIncome} height= {200} width={800}>
               {/*  <CartesianGrid ></CartesianGrid> */}
                <Bar className='bar' barSize={25} fill="#4169e1" type="monotone" dataKey="amount" stroke="#8884d8"></Bar>
                <XAxis dataKey={"_id"}></XAxis>
                <YAxis dataKey={"amount"}></YAxis>
            </BarChart>
        </ResponsiveContainer>
        <div className="most-pop-container column sm-gap">
          <h4>Most Popular Products</h4>
          {mostOrdered.map(el=>{
            return <div className="most-pop-item row sm-gap sm-text vert-center">
               {  <p>{mostOrdered.indexOf(el) + 1}-</p> }
                <img src={el.img} alt="" />
                <p>{el.name}</p>
                <p>{el.quantity}</p>
            </div>
          })}
        </div>

        </div>

  )
}

export default SalesChart

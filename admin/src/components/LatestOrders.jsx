import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'



const LatestOrders = ({allOrders}) => {

   // const last5 = allOrders.sort((a, b)=>a.createdAt - b.createdAt)
   const [last5, setLast5] = useState([])

   const forToken = useSelector(state=>state.currentAdmin)


   useEffect(()=>{
       const getLast5Orders = async ()=>{
        const res = await axios.get("http://localhost:5000/api/order/orders?last5=true",{headers: {token:forToken.accessToken, userId: forToken._id}})
        setLast5(res.data)
       }
       getLast5Orders()    
   },[])

    console.log(last5)


  return (
    <table>
        <thead>
        <tr className='table-header'>
         <th>Latest Orders</th>
         </tr>
        </thead>
       
       <tbody>
           
           {last5.map(el=>{
               return <tr>
                   <td>{el._id}</td>
                   <td>{el.email}</td>
                   <td>{el.amount} $ </td>
                   <td>{new Date(el.createdAt).toLocaleDateString()}</td>
               </tr>
           })}

     {/*   <tr>
            <td>2344</td>
            <td className='name'>Maria Almeida</td>
            <td>Maria@hotmail.com</td>
            <td>$302</td>
            <td className='status'>Delivered</td>
            <td>07.05.2022</td>
        </tr>
        <tr>
        <td>3431</td>
            <td className='name'>Rui Breezy</td>
            <td>Rui@hotmail.com</td>
            <td>$502</td>
            <td className='status'>Delivered</td>
            <td>07.05.2022</td>
        </tr>
        <tr>
            <td>7478</td>
                <td className='name'>Julio Bessa</td>
                <td>Julio@hotmail.com</td>
                <td>$32</td>
                <td className='status'>Cancelled</td>
            <td>05.05.2022</td>
        </tr>
        <tr>
            <td>4578</td>
                <td className='name'>Eduardo Barros</td>
                <td>Eduardo@hotmail.com</td>
                <td>$35</td>
                <td className='status'>Pending</td>
                <td>05.05.2022</td>
        </tr>
        <tr>
            <td>5034</td>
                <td className='name'>Virginia Valente</td>
                <td>Virginia@hotmail.com</td>
                <td>$25</td>
                <td className='status'>Cancelled</td>
                <td>05.05.2022</td>
        </tr> */}
       </tbody>
         
    </table>
  )
}

export default LatestOrders

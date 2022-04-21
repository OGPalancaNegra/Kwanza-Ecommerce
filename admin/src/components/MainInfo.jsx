import { faMoneyBill, faCartShopping, faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


const MainInfo = ({monthlyIncome, allOrders, products}) => {

   // const totalIncome 
    
   const amountsArray=  monthlyIncome.map(el=>{
        return el.amount
    })

    const initialValue = 0
    const totalAmount = amountsArray.reduce((prevEl, accumulator)=>prevEl + accumulator, initialValue)

    console.log(totalAmount)

  return (
    <div className= "main-info row md-gap">
        <div className='main-widget row vert-center sm-gap'>
            <FontAwesomeIcon className='main-icon' icon={faMoneyBill}></FontAwesomeIcon>
            <div className='column sm-gap'>
                <p>Total Sales</p>
                <h3>{Math.ceil(totalAmount)} $</h3>
            </div>
        </div>
        <div className='main-widget row vert-center sm-gap'>
            <FontAwesomeIcon className='main-icon' icon={faCartShopping}></FontAwesomeIcon>
            <div className='column sm-gap'>
                <p>Total Orders</p>
                <h3>{allOrders.length}</h3>
            </div>
        </div>
        <div className='main-widget row vert-center sm-gap'>
            <FontAwesomeIcon className='main-icon' icon={faBasketShopping}></FontAwesomeIcon>
            <div className='column sm-gap'>
                <p>Total Products</p>
                <h3>{products.length}</h3>
            </div>
        </div>
    </div>
  )
}

export default MainInfo

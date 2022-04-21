import React from 'react'
import Navbar from '../Components/Navbar'
import {useNavigate, useLocation } from 'react-router-dom'
import { editProduct } from '../Redux/apiCalls';

const Discount = ({discountedProducts}) => {

  // get every product with a discount
  console.log(discountedProducts)

  const navigate = useNavigate()


  const oldPriceStyle = (el)=> {
    return {
        color: el.percentageNum > 0 && "grey",
        textDecoration: el.percentageNum > 0 && "line-through" 
    }
  }

  return (
    <>  
        <Navbar></Navbar>
        <div className="content-container">
          <h1 className='md-bottom-margin'>Products On Sale</h1> 
          <div className="product-grid grid sm-gap">
            {discountedProducts.map(el=>{
              return <div className="product-item column sm-gap md-padd relative" onClick={()=>{
                navigate(`/product/${el._id}`)
                editProduct({productViews:"change product count"},el._id, )    }}>
                <h2 className='absolute discount-info sm-vert-padd md-horz-padd'>{el.percentageNum}%</h2>
                <img src={el.images[0]} alt="" />
                <h3>{el.name}</h3>
                <p>{el.description}</p>
                <div className="row sm-gap">
                   <h3 style={oldPriceStyle(el)}>{el.price}$</h3>
                   <h3>{el.price - (el.price * el.percentageNum / 100)}$</h3>
                </div>
                
              </div>
            })}
          </div>
          

        </div>    
    </>
  )
}

export default Discount

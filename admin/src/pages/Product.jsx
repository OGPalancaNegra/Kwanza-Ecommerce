import React, { useEffect, useState } from 'react'
import Page from './Page'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import ProductList from '../components/ProductList'
import Create from './Create'
import {BrowserRouter, Routes, Route, Redirect, useNavigate, useLocation } from 'react-router-dom'
import { faMoneyBill, faCartShopping, faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components';

import 'swiper/css/navigation';
import SwiperCore, { Autoplay } from 'swiper';
import { deleteProduct, editProduct } from '../redux/apiCalls'
import {
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable, 
    getDownloadURL,
    deleteObject,
    
  } from "@firebase/storage";
import app from '../firebase'
import { async } from '@firebase/util'
import { current } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'

/* Info To Display
    1- Reviews
    2- Order and Sale Ranking Number 
    3- Online Quantity Left 
        3.1 quantity per color, size etc
    4-  Total, daily, monthly page views
    5- Total, daily, monthly Orders
    6- Total daily sales

    Quantity per color and size = add object to colors? quant, inStock

*/

const Product = () => {

    const [foundProduct, setProduct] = useState({})
    const [productOrderInfo, setOrderInfo] = useState([])
   

    const navigate = useNavigate()
    SwiperCore.use([Autoplay]);

    const forToken = useSelector(state=>state.currentAdmin)

    if (!forToken) {
       navigate("/login")
   }

   
    const pathId = useLocation().pathname.split("/")[2]
  

    const [manualInput, setManualInput] = useState(false)
    
    const [productReviews, setReviews] = useState([])

    useEffect(()=>{
        const getProduct = async () =>{
            try {
                const res = await axios.get(`http://localhost:5000/api/product/products/${pathId}`)
                setProduct(res.data)
            } catch {
                console.log("Failed to get it")
            }
        }

        const getProductOrders = async ()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/order/product/${pathId}`,{headers: {token:forToken.accessToken, userId: forToken._id}})
                setOrderInfo(res.data)
            } catch {
                console.log("didnt get product order info")
            }
        }
        getProduct()
        getProductOrders()
    },[])

   console.log(productOrderInfo)

   
   const quanityArray = productOrderInfo.map(el=>{
       return el.quantity
   })

   const priceArray = productOrderInfo.map(el=>{
    return el.price * el.quantity
})
           
   const profitMade = priceArray.reduce((prev,current)=>parseInt(prev)+parseInt(current),0)
   
   const itemsSold = quanityArray.reduce((prev,current)=>parseInt(prev)+parseInt(current),0)

    const deleteP = ()=>{
       
       // delete images in database
       console.log("deleting Product...")
        const storage = getStorage(app)
        foundProduct.images.forEach(el=>{
            deleteObject(ref(storage, el))
            .then(()=>{
                console.log("image succesfully deleted")
                deleteProduct(pathId)
                navigate("/products")
                
            })
            .catch(console.log("not deleted"))

        })
        
        console.log("i ran")
    }


    console.log(manualInput)

    const generatePerOptions = ()=>{

        let optionArray = []
        for (let i=0 ; i < 11; i + 5){
            optionArray.push(<option value={i}>{i}%</option>)
        }
        return optionArray
    }


    const storeDiscount = (e)=>{
        const discountPercentage = e.target.value
        const numToDiscount = foundProduct.price *discountPercentage / 100
        editProduct({discountPercentage: discountPercentage}, pathId, forToken.accessToken, forToken._id)
        window.location.reload(false);
    }

    const toggleStock = ()=>{
        editProduct({inStock: !foundProduct.inStock}, pathId, forToken.accessToken, forToken._id)
        window.location.reload(false);
    }

    

    const displayDiscountedPrice = ()=>{
        
        return foundProduct.percentageNum > 0 && <h3>{foundProduct.price - (Math.round(foundProduct.price * foundProduct.percentageNum / 100)) }$</h3>}
    

    const priceHeaderStyle = {
        textDecoration : foundProduct.percentageNum > 0 && "line-through",
        color: foundProduct.percentageNum > 0 && "#BEBEBE"
    }


    const stockStyle = {
        backgroundColor: foundProduct.inStock ? "#00FF7F" : "red",
       
    }


     /* RETRIEVE ALL PRODUCT REVIEWS */

  useEffect(()=>{
    const getProductReview = async()=>{
      const res = await axios.get(`http://localhost:5000/api/review/${pathId}`)
      setReviews(res.data)
    }
    getProductReview()
  },[])
   
  console.log(productReviews)

  return (
    <>
        <Page></Page>
        <div className='main-content right-section'>
      <div className="row sp-btw">
        <h2><a href='/products'>Product</a> / Product Page</h2>
        <p></p>
        <div className="row sm-gap">
            <button className="btn danger-btn" onClick={deleteP}><FontAwesomeIcon icon={faFileExport}/>Delete</button>
            <button className="btn primary-btn" onClick={()=>navigate(`/products/${foundProduct._id}/edit`)} >+ Edit</button>
        </div>
      </div>
      
      <div className= "main-info row md-gap">
        <div className='main-widget row vert-center sm-gap'>
            <FontAwesomeIcon className='main-icon' icon={faMoneyBill}></FontAwesomeIcon>
            <div className='column sm-gap'>
                <p>Product Profit</p>
                <h3>{profitMade} $</h3>
            </div>
        </div>
        <div className='main-widget row vert-center sm-gap'>
            <FontAwesomeIcon className='main-icon' icon={faCartShopping}></FontAwesomeIcon>
            <div className='column sm-gap'>
                <p>Items Sold</p>
                <h3>{itemsSold}</h3>
            </div>
        </div>
        <div className='main-widget row vert-center sm-gap'>
            <FontAwesomeIcon className='main-icon' icon={faEye}></FontAwesomeIcon>
            <div className='column sm-gap'>
                <p>Product Views</p>
                <h3>{foundProduct.productViews}</h3>
            </div>
        </div>
    </div>

    <div className="product-display row md-gap">
        <Swiper className='mySwiper'
            loop={foundProduct.images?.length > 1 && true}
            autoplay={{delay: 4000}}>
            {foundProduct.images?.length >= 1 && foundProduct.images.map(el=>{
                return <SwiperSlide>
                    <img src={el} />
                </SwiperSlide>
            })}
            {/* <img src={foundProduct.images?.length > 0 && foundProduct.images[0]} alt="" /> */}
        </Swiper>
        
        <div className="info column lg-gap">
            <h3>{foundProduct.name}</h3>
            <p>{foundProduct.description}</p>
            <div className="row sp-btw">
                <div className="row sm-gap">
                 <h3 style={priceHeaderStyle}>{foundProduct.price}$</h3>
                {foundProduct.percentageNum > 0 && <h3>{foundProduct.price - (Math.round(foundProduct.price * foundProduct.percentageNum / 100)) }$</h3>}
                </div>
                
                <div className="column sm-gap">
                {
                    !manualInput ? (
                        <select name="discount" onChange={storeDiscount} id="">
                    
                        <option selected = {foundProduct.percentageNum === 0} value="0">None</option>
                        <option selected = {foundProduct.percentageNum === 5} value="5">5%</option>
                        <option selected = {foundProduct.percentageNum === 10} value="10">10%</option>
                        <option selected = {foundProduct.percentageNum === 15} value="15">15%</option>
                        <option selected = {foundProduct.percentageNum === 20} value="20">20%</option>
                        <option selected = {foundProduct.percentageNum === 25} value="25">25%</option>
                        <option selected = {foundProduct.percentageNum === 30} value="30">30%</option>
                        <option selected = {foundProduct.percentageNum === 35} value="35">35%</option>
                        <option selected = {foundProduct.percentageNum === 40} value="40">40%</option>
                        <option selected = {foundProduct.percentageNum === 45} value="45">45%</option>
                        <option selected = {foundProduct.percentageNum === 50} value="50">50%</option>
                    </select>
                    ) : <input className="number-input" type="number" name="" placeholder='55%' id="" /> 
                }
                <p className='manual-text sm-text' onClick={(e)=>{
                    e.stopPropagation()
                    setManualInput(oldBool=>!oldBool)
                    
                }}>{!manualInput ? "manual input": "default"}</p>
                </div>
            </div>
            
            <div className="row sm-gap">
            {foundProduct.colors?.length>1 && foundProduct.colors.map(el=>{
                return <div className='colors' style={{backgroundColor:el}}></div>
            })}
            </div>
            <div className="row sm-gap">
                {foundProduct.sizes?.length >= 1 &&foundProduct.sizes.map(el=>{
                    return <span>{el}</span>
                })}
            </div>
            <div className="row sm-gap">
                {foundProduct.categories?.length >= 1 &&foundProduct.categories.map(el=>{
                    return <span>{el}</span>
                })}
            </div>
            
            {foundProduct.inStock ? <span style={stockStyle} onClick={toggleStock} className='stock'>In Stock</span>: <span style={stockStyle} onClick={toggleStock} className='stock'>Out Of Stock</span>}
        </div>
    </div>

    <div className="client-comment-section column sm-gap">
         <h3>Client Comments</h3>
         {productReviews && productReviews.map(el=>{
                return <div className='product-reviews column sm-gap sm-padd'>
                  <Rating ratingValue={el.rating*20}></Rating>
                  <p><i>{el.clientId.name}</i></p>
                  <p className='lg-text'>{el.comment}</p>
                </div>
              })}

    </div>
    
    </div>

    </>
  )
}

export default Product

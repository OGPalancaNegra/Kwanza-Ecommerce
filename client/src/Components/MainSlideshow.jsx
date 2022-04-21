import React, { useEffect, useState } from 'react'


import {Swiper, SwiperSlide} from 'swiper/react'


import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
import axios from 'axios'
import discountImg from "../images/discount/background2.jpg"
import '../App.css';
import SwiperCore, { Autoplay } from 'swiper';
import {useNavigate } from 'react-router-dom'
import { editProduct } from '../Redux/apiCalls';

const MainSlideshow = ({discountedProducts}) => {

// 1- get products with slideshow display set to true
// 2- get discounted elements with displayOnSlideShow set true


    const navigate = useNavigate()

    

    SwiperCore.use([Autoplay]);


  return (
    <Swiper className='main-swiper'
        loop={ true}
        autoplay={{delay: 3500}}>
        <SwiperSlide className='swiper'>
            <img src={discountImg}></img>
            <h1 onClick={()=>navigate("/discount")} className='absolute swiper-info sm-padd'>Check Discounts</h1>
        </SwiperSlide>
       
        {discountedProducts.map(el=>{
            if (el.displayOnSlideShow){
                return <SwiperSlide className='swiper relative column'>
                         <img src={el.images[0]} alt="" />
                         <h1 onClick={()=>{navigate(`/product/${el._id}`)
                                          editProduct({productViews:"change product count"},el._id, )
                        }} className='absolute swiper-info lg-padd'> Only {el.price-(el.price * el.percentageNum / 100)}$!</h1>
                   
                </SwiperSlide> 
            }
            
        })}
    </Swiper>
  )
}

export default MainSlideshow

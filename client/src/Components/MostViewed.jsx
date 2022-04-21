import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'


import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';

import axios from 'axios'

import SwiperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import {useNavigate } from 'react-router-dom'
import { editProduct } from '../Redux/apiCalls';


const MostViewed = () => {


    const [last5, set5] = useState([])

    SwiperCore.use([Autoplay]);
    const navigate = useNavigate()

    useEffect(()=>{
        const getLast5Prod = async ()=>{
            const res = await axios.get("http://localhost:5000/api/product/products?mostViewed=true")
            set5(res.data)
        }

        getLast5Prod()

    },[])


    const oldPriceStyle = (el)=> {
        return {
            color: el.percentageNum > 0 && "grey",
            textDecoration: el.percentageNum > 0 && "line-through" 
        }
    }

  return (
    <div className='content-container column md-gap'>
        <h1>Most Viewed Products</h1>
        <Swiper className='new-swiper'
             modules={[Navigation, Pagination, Scrollbar, A11y]}
             navigation = {true}
             slidesPerView={3}
             spaceBetween={50}
             loop={true}
             autoplay={{delay: 2000}}
             
            
        >
            {last5.length===8 && last5.map(el=>{
                return <SwiperSlide onClick={()=>{
                    navigate(`/product/${el._id}`)
                    editProduct({productViews:"change product count"},el._id, )    }}  className='new-swiper-slide column sm-gap relative '>
                    {el.percentageNum > 0 && <h3 className='absolute discount-info xsm-vert-padd md-horz-padd'>{el.percentageNum}%</h3>}
                    <img src={el.images[0]} alt="" />
                    <div className="swiper-info sm-padd column sm-gap">
                        <h3>{el.name}</h3>
                        <p>{el.description}</p>
                        <div className="row sm-gap">
                            <h4 style={oldPriceStyle(el)}>{el.price}$</h4>
                            {el.percentageNum > 0 && <h4>{el.price - (el.price * el.percentageNum / 100)}$</h4>}
                        </div>
                        

                    </div>
                    

                </SwiperSlide>
            })}
        </Swiper>
      
    </div>
  )
}

export default MostViewed

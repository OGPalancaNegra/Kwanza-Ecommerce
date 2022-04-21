import React from 'react'
import menImg from "../images/image_grid/mens_fashion.webp"
import womenImg from "../images/image_grid/women_fashion.jpg"
import kidImg from "../images/image_grid/kids_fashion.png"
import babyImg from "../images/image_grid/baby_fashion.jpg"
import {useNavigate } from 'react-router-dom'

const ImageGrid = () => {

    

    //const imageGridData = [{category: "Men"}]
    const navigate = useNavigate()

  return (
    <div className="grid">
        <div className="relative">
            <img src={menImg} alt="" />
            <div className="grid-info absolute">
                <h1>Mens Fashion</h1>
                <button onClick={()=>navigate("productlist?category=Men")} className='md-padd sm-top-margin'>Shop Now</button>
            </div>
        </div>
        <div className="relative">
            <img src={womenImg} alt="" />
            <div className="grid-info absolute">
                <h1>Women Fashion</h1>
                <button onClick={()=>navigate("productlist?category=Women")} className='md-padd sm-top-margin'>Shop Now</button>
            </div>
        </div>
        <div className="relative">
            <img src={kidImg} alt="" />
            <div className="grid-info absolute">
                <h1>Kids Fashion</h1>
                <button onClick={()=>navigate("productlist?category=Kids")} className='md-padd sm-top-margin'>Shop Now</button>
            </div>
        </div>
        <div className="relative">
            <img src={babyImg} alt="" />
            <div className="grid-info absolute">
                <h1>Baby Fashion</h1>
                <button onClick={()=>navigate("productlist?category=Babies")} className='md-padd sm-top-margin'>Shop Now</button>
            </div>
        </div>
    </div>
  )
}

export default ImageGrid

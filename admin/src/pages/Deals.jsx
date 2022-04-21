import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { editProduct } from '../redux/apiCalls'
import Page from './Page'
import {Swiper, SwiperSlide} from 'swiper/react'
import backgroundImg from  "../images/discount/background2.jpg"
import 'swiper/css/navigation';
import SwiperCore, { Autoplay } from 'swiper';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Deals = () => {

    const [allDiscountedItems, setDiscount] = useState([])
    // get every Every Element in a deal and store in a dealProperty
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostsPerPage] = useState(15)

  
    
    SwiperCore.use([Autoplay]);
    const navigate = useNavigate()

    const forToken = useSelector(state=>state.currentAdmin)

     if (!forToken) {
        navigate("/login")
    }

    useEffect(()=>{
        const getDiscoutedProduct = async ()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/product/products?isDiscounted=true`)
                setDiscount(res.data)
                } catch {
                    console.log("couldnt get the ting")
            }
        }
        getDiscoutedProduct()
    },[])

    console.log(allDiscountedItems)

    

    // select items to display on SlideShow and setSlideShow True so in the client side get them and display

    const addToSlideShow = (el)=>{
        editProduct({displayOnSlideShow: !el.displayOnSlideShow}, el._id, forToken.accessToken, forToken._id )
        window.location.reload(false);
    }

    const displayProducts = ()=>{

        const indexOfLastPost = postPerPage * currentPage
        const indexOfFirstPost = indexOfLastPost - postPerPage
    
          if (allDiscountedItems) {
            const currentPosts = allDiscountedItems.slice(indexOfFirstPost,indexOfLastPost)
            return currentPosts.map(el=>{
              
                return <div className='product column sm-gap' onClick={()=>addToSlideShow(el)} style={inSlideShowStyle(el)}>
                        <div className='img-div'>
                         <img src={el.images[0]} alt="" />
                         {el.percentageNum > 0 && <h4 className='discount-div'>{el.percentageNum}%</h4>}
                        </div>
                        <p>{el.name}</p>
                        <h5>{el.price}</h5>
                    </div>  
            })    
          }
      }

      const inSlideShowStyle = (el)=>{
          return {
            backgroundColor: el.displayOnSlideShow && "#00FF7F"
        }
      }
       


      const headerStyle = {
          margin: "10px 0px 20px 0px"
      }
    

  return (
    <>
        <Page></Page>
        <div className="main-content right-section">
            <h3>Deal Page</h3>
            <div className='products'>
          <div className="row sp-btw">
             <input type="search" name="" id=""/>
             <div className="row sm-gap wrap">
                 
             </div>
          </div>

          <h2 style={headerStyle}>Select to Add Or Remove From Slideshow</h2>
          <div className='product-grid grid sm-gap'>
                {displayProducts()}
          </div>

      </div>
      <div className="products column lg-gap">
        <h2>SlideShow Preview</h2>

        <Swiper className='top-deal-slideshow'
            loop={ true}
            autoplay={{delay: 3500}}>
            <SwiperSlide className='deal-slide'>
                <img src={backgroundImg} alt="" />
            </SwiperSlide>
            {allDiscountedItems.map(el=>{
                if (el.displayOnSlideShow){
                    return <SwiperSlide className='deal-slide column'>
                        <img src={el.images[0]} alt="" />
                        <div className='slide-info'>
                            <h3>{el.name}</h3>
                            <h3>Only {el.price - (el.price * el.percentageNum / 100)}$</h3>
                        </div>
                    </SwiperSlide>
                }
            })}
        </Swiper>

      </div>
      
        </div>
    </>
  )
}

export default Deals

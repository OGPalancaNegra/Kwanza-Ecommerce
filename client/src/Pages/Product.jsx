import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import {useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../Redux/cartRedux';
import axios from "axios"
/* import StarRatings from './react-star-ratings'; */
import { Rating } from 'react-simple-star-rating'
import { deleteProductReview, getAllProductReviews, postLogin, postReview } from '../Redux/apiCalls';




const Product = () => {

  // 1 get product and store in state var
  // 2 display product in column format

  const productId = useLocation().pathname.split("/")[2]
  console.log(productId)
  const [product, setProduct] = useState({})
  
  const [productReviews, setProductReviews] = useState([])


  useEffect(()=>{
    const getAllProductReviews = async ()=>{
      try {
        const res =await axios.get(`http://localhost:5000/api/review/${productId}`)
        setProductReviews(res.data)
      } catch {
        console.log("get product reviews not made")
      }
    }
    getAllProductReviews()
  },[])
 
  //getAllProductReviews(productId,setProductReviews)

  console.log(productReviews)
  
  const dispatch = useDispatch()


  const userInfo = useSelector(state=>state.user)
  console.log(userInfo)

  const [review, setReview] = useState({
    rating:0,
    comment:"",
    clientId: userInfo && userInfo._id,
    productId: productId
  }) 

 

  

  console.log(productId)

  useEffect(()=>{
      const getProduct = async () =>{
        const res = await axios.get(`http://localhost:5000/api/product/products/${productId}`)
        setProduct(res.data)
        setSelection((oldSelection)=>{
          return {
            ...oldSelection,
            name: res.data.name,
            price: res.data.percentageNum == 0 ? res.data.price :  res.data.price - (res.data.price * res.data.percentageNum / 100),
            img: res.data.images[0]
          }
        })
      }
      getProduct()
  },[productId])

  console.log(product)


  console.log(product.name)


  const [selectedProduct, setSelection] = useState({
    productId: productId,
    name: null,
    size: null,
    color: null,
    quantity: 1,
    price: product.percentageNum == 0 ? product.price :  product.price - (product.price * product.percentageNum / 100),
    img: ""
  })


  const oldPriceStyle = (el)=> {
    return {
        color: el.percentageNum > 0 && "grey",
        textDecoration: el.percentageNum > 0 && "line-through" 
    }
}


  const colorStyle = (el)=>{
    return {
      backgroundColor : el,
      opacity: selectedProduct.color === el ? "1" : "0.4"
      
    }
  }

  const storeSelection = (e)=>{
    console.log(e.target.type)
    setSelection((oldSelection)=>{
      return {
        ...oldSelection, 
        [e.target.name]: e.target.value
      }
    })
  }

  const storeColor = (el)=>{

    // if color not in selectedProduct colors add else remove

    if (selectedProduct.color != el){
      
      setSelection((oldSelection)=>{
        return {
          ...oldSelection,
          color: el
        }
      })
    } else {
      setSelection((oldSelection)=>{
        return {
          ...oldSelection,
          color: null
        }
      })
    }
   
  }


  const addToReduxCart = (e) =>{
    if (Object.values(selectedProduct).every(el=>el != null)){
      console.log("no empty values")
      dispatch(addToCart(selectedProduct))
    } else {
      console.log("empty values")
      alert("Select Color and Size")
      // select color or whatever message here
    }
   
  }

  // Catch Rating value
  const handleRating = (rate) => {
    
    setReview((oldReview)=>{
      return {
        ...oldReview,
        rating: rate/20
      }
    })
   
  }

  const handleComment = (e)=>{
    setReview((oldReview)=>{
      return {
        ...oldReview,
        comment: e.target.value
      }
    })
 
  }

  console.log(review)




 // const storeColor = (e)

  console.log(selectedProduct)

  const submitReview = (e)=>{
    
    e.preventDefault()
    
    if (userInfo._id){
      postReview(review, productId)
    } else {
      alert("must log in")
    }   
  }


  const handleReviewDelete = (e, el)=>{
    console.log(e,el)
    if (userInfo._id === el.clientId._id){
      deleteProductReview(el._id, el.productId)
      window.location.reload(false)
    } else {
      alert("You Do Not Own This Review")
    }
  }


 

  return (
    <>  
        <Navbar></Navbar>
        <div className="content-container">
           <h2 className='sm-bottom-margin'>{/* <a href="/productlist?category=kids">Kid Products</a> */} / Product</h2>

           <div className='product-review-container'>
           <div className="product-container row md-gap light-grey-border md-padd">
              <img src={product.images?.length > 0 && product.images[0]} alt="" />
             <div className="product-info column md-gap">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="row sm-gap">
                 <h3 style={oldPriceStyle(product)}>{product.price}$</h3>
                 {product.percentageNum > 0 && <h3>{product.price - (product.price * product.percentageNum / 100)}$</h3>}
              </div>

              <div className="row lg-gap">
                  <div className="row sm-gap">
                    {product.colors?.length > 0 && product.colors.map(el=>{
                    return <div onClick={()=>storeColor(el)} style={colorStyle(el)} className='color xsm-padd'></div>
                  })}
                  </div>
                  <select onChange={storeSelection} name="size" id="sizes" className='light-grey-border' >
                    <option value="null">Select Size</option>
                    {product.sizes?.length > 0 && product.sizes.map(el=>{
                      return <option value={el} name="size">{el}</option>
                    })}
                  </select>
              </div>
                
              <div className="row lg-gap">
                <input onChange={storeSelection} type="number" name="quantity" id="quantity" className='light-grey-border xsm-padd' placeholder='1'/>
                <button onClick={addToReduxCart} className='md-horz-padd'>Add To Cart</button>
              </div>

             </div>
           </div>

          
          <div className="review-section column">
             <h3>Leave a Review</h3>
             <form className='column md-gap' action="">
             <Rating onClick={handleRating} ratingValue={review.rating} /* Available Props */ />
              <label htmlFor="comment">Comment</label>
              <textarea onChange={handleComment} name="comment" id="comment" cols="30" rows="4" className='light-grey-border'></textarea>
              <button onClick={submitReview} className='sm-padd'>Submit Review</button>
             </form>

              <h3>Customer Reviews</h3>

              {productReviews && productReviews.map(el=>{
                return <div className='product-reviews column sm-gap light-grey-border sm-padd'>
                  <Rating ratingValue={el.rating*20}></Rating>
                  {el.clientId._id === userInfo._id ? <p><i>You</i></p>:<p><i>{el.clientId.name}</i></p>}
  
                  <p className='lg-text'>{el.comment}</p>

                  {el.clientId._id === userInfo._id && <>
                    <button onClick={(e)=>handleReviewDelete(e,el)} className='btn sm-padd'> Delete</button>
                  </>}
                </div>
              })}
          </div>

          </div>
          
        </div>
        
    </>
  )
}

export default Product

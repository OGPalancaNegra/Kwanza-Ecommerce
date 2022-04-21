import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { emptyCart } from '../Redux/cartRedux';


const Checkout = ({windowSize}) => {


 const cartItems = useSelector(state=>state.cart.products)
 const cartTotal = useSelector(state=>state.cart.total)
 const cartQuantity = useSelector(state=>state.cart.quantity)
 console.log(cartItems)
 //const [positionChange, setPostion] = useState("")
 
 //const history = useHistory()


 const [rowColumn, setRowColumn] = useState('')
 
 const userId = useSelector(state=>state.user._id)
 
 const dispatch = useDispatch()
  

 useEffect(()=>{
    if (windowSize < 800){
        setRowColumn("column")
    } else if (windowSize > 800){
        setRowColumn("row")
    }
 },[2])

 const navigate = useNavigate()
 const [payBool, setPayBool] = useState(false)
 //const [stripeToken, setStripeToken] = useState(null);



 const checkoutUser = ()=>{
     //check if logged in front end and backend??
     
     // if user REDUX ID OR FROM BACKEND not true DISPLAY LOGIN DIV
     
     if (userId){
         //postCheckoutTing
         console.log("taking your payment")
        setPayBool(true)
        
         // head to stripe checkout
     } else {
         console.log("not logged in")
         navigate("/login")
     }   
 }

/*  useEffect(() => {
     console.log("taking payment")
    const makeRequest = async () => { */

     /*  try {
        const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cartTotal,
        });
        setPayBool(false)
        history.push("/success", {
          stripeData: res.data,
          products: cartItems, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cartTotal]); */
 
  const onToken = async (token) =>{
    
    try {
        const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenId: token.id,
          amount: cartTotal,
        });

        console.log(res.data)
        console.log(res.data.email)

        // remove cart items, set ting to false and redirect to order page
        setPayBool(false)
        dispatch(emptyCart())
        // create Order ting

        const res2 = await axios.post("http://localhost:5000/api/order", {
          userId: userId,
          amount: cartTotal, 
          quantity: cartQuantity,    
          products: cartItems,
          email: res.data.billing_details.name
          
    })
    } catch {
        console.log("payment failure")
    }
}

  return (
    <>
        <Navbar></Navbar>
        <div className='content-container'>
            <h2 className='md-bottom-margin'>Your Items</h2>
            <div className="row sp-btw md-bottom-margin">
                <button className='sm-vert-padd md-horz-padd'>Continue Shopping</button>
                <ul className='sm-gap row'>
                    <li>Shopping Bag</li>
                    <li>Your Wishlist</li>
                </ul>
                <button onClick={checkoutUser} className='sm-vert-padd md-horz-padd checkout-info-button'>Checkout Now</button>
            </div>
            {!payBool ? <div className={`row checkout-container`}>
                <div className="selected-items column">
                    {cartItems.map(el=>{
                        return <div className="item row md-gap sm-vert-padd">
                             <img src={el.img} alt="" /> 
                             <div className="item-info column md-gap">
                                 <p><b>Product Name:</b>  {el.name}</p>
                                 <div className="row sp-btw">
                                   <p><b>Price:</b> {el.price}$</p>
                                   <p><b>Qty:</b> {el.quantity}</p>
                                 </div>

                                <div className="row sp-btw">
                                    <div className="row sm-gap">
                                      <p><b>Color: </b></p>
                                         <div className='checkout-color sm-padd' style={{backgroundColor:el.color}}></div>
                                     </div>
                                     <p><b>Total: </b>{el.price * el.quantity}$</p>
                                </div>
                                 
                                 
                                 <p><b>Size:</b>  {el.size}</p>
                             </div>
                        </div>
                    })}
                </div>
                
                <div className="checkout-info column lg-gap">
                    <h2 className='center-text'>Order Summary</h2>
                    <div className="column lg-gap">
                        <div className="row sp-btw">
                            <p>Subtotal</p>
                            <p>{cartTotal}</p>
                        </div>
                        <div className="row sp-btw">
                            <p>Quantity</p>
                            <p>{cartQuantity}</p>
                        </div>
                        <div className="row sp-btw">
                            <h3><b>Total</b></h3>
                            <h3><b>{cartTotal}$</b></h3>
                        </div>
                        <button onClick={checkoutUser} className='sm-vert-padd checkout-info-button'>Checkout Now</button> 
                        {/* <StripeCheckout 
                        token="{this.onToken}"
                        stripeKey="my_PUBLISHABLE_stripekey"/> */}
                    </div>
                </div>

            </div> :<StripeCheckout className="stripe-btn"
         token={onToken}
         stripeKey="pk_test_51KkFkgLwDOPZWxxNpdaFsqAKMpAVhz1RMMCtWiGlEEEjdIOs8aAI8CZbS7X6l06V4j5VOP0bl7icB5m1Too29FgF00yLdwYqYE"
        


       />  }

        
        </div>   

    </>
  )
}

export default Checkout

import React from 'react'
import {useNavigate } from 'react-router-dom'
import { faDashboard, faSun, faBox, faCartShopping, faGear, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faSunPlantWilt } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../Redux/cartRedux'
import { emptyUser } from '../Redux/userRedux'


const Navbar = () => {

  const navigate = useNavigate()


  const quantity = useSelector(state=>state.cart.quantity)
  const userId = useSelector(state=>state.user._id)
  const dispatch = useDispatch()
/*  const register = ()=>{

 }

 const login = ()=>{

 } */


  return (
    <>
    
    <nav className='main-nav row sp-btw sm-padd vert-center'>
        <div className="row sm-gap">
        <select name="language" id="language" className='light-grey-border'>
            <option value="eng">Eng</option>
            <object data="port" type="">Port</object>
        </select>
        <input type="search" name="search" id="search" className='light-grey-border xsm-padd'/>
        </div>
        <h3 onClick={()=>navigate("/")}>Kwanza Shop</h3>
        <ul className='row sm-gap md-text'> 
        {!userId ? <>
          <li onClick={()=>navigate("/register")}>Register</li>
          <li onClick={()=>navigate("/login")}>Sign In</li>
        </> :  
        <>
          <li onClick={()=>{
            dispatch(emptyCart())
            dispatch(emptyUser())
            window.location.reload(false)
          }}>Log Out</li>
          <li onClick={()=>navigate("/orders")}>Orders</li>
        </>
          }
           
            <div onClick={()=>navigate("/checkout")} className="cart relative">
             <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
             {quantity > 0 && <p className="absolute cart-quantity sm-text">{quantity}</p> }
            </div>
            
        </ul>

    </nav>
    <ul className='category-list row horz-center sm-padd'>
      <li onClick={()=>navigate("/productlist?category=Men")} className='xsm-padd light-grey-border'>Men</li>
      <li onClick={()=>navigate("/productlist?category=Women")} className='xsm-padd light-grey-border'>Women</li>
      <li onClick={()=>navigate("/productlist?category=Kids")} className='xsm-padd light-grey-border'>Kids</li>
      <li onClick={()=>navigate("/productlist?category=Babies")} className='xsm-padd light-grey-border'>Babies</li>
    </ul>
    </>
  )
}

export default Navbar

import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'



const Footer = () => {
  return (
    <footer>
        <div className="news-letter column vert-center horz-center sm-gap">
            <h1 className='fs-600'>Newletter</h1>
            <form action="">
                <input className='sm-padd' type="email" name="" id="" placeholder='Your Email' />
                <button className='sm-padd'> <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon></button>
            </form>
        </div>
        <div className="footer-grid grid content-container">
            <div className="info-sec">
                <h3 className='fs-300'>Lama</h3>
                <p c>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut facilis, laudantium quis deserunt necessitatibus fugit nihil libero nesciunt tenetur.</p>
            </div>
            <ul className="link-sec1">
                <h3 className='fs-300'>Usefull Links 1</h3>
                <li>Home</li>
                <li>Men Fashion</li>
                <li>Accessories</li>
                <li>Order Tracking</li>
                <li>GuestList</li>
                
            </ul>
            <ul className="link-sec2">
                <h3 className='fs-300'>Usefull Links 2</h3>
              
                <li>Cart</li>
                <li>Women Fashion</li>
                <li>My Account</li>
                <li>Wushlist</li>
                <li>Terms</li>
            </ul>
            <div className="contact-sec">
                <h3 className='fs-300'>Contact</h3>
                <ul>
                    <li>622 Dixie Path, South Tobinchester 98336</li>
                    <li>+1 234 56 78</li>
                    <li>contact@lamadev</li>
                    <li>Visa Card List Ting</li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
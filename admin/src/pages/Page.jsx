import React, { useState } from 'react'

import { faDashboard, faSun, faBox, faCartShopping, faGear, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faSunPlantWilt } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import image from "../logo.svg"

import { faNode } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'


const Page = () => {
  const navigate = useNavigate()

 /*  const navigateTo = (e)=>{
    if (e.target.outerText === "Dashboard"){
      navigate("/dashboard");
    } else if (e.target.outerText === "Product List"){
      navigate("/products");
    } else if (e.target.outerText === "Create Product"){
      navigate("/create");
    } else if (e.target.outertext = "Deal Slideshow") {
      console.log("moving to slideshow");
      navigate("/deals");
    } else if (e.target.outertext = "Orders"){
      console.log("moving to orders");
      navigate("/orders");
    }
  } */

    return (
        <>
          <div className='sidebar column md-gap'>
            <h3> <FontAwesomeIcon icon={faNode} className="side-icons"></FontAwesomeIcon>Admin</h3>
            <ul className="column xlg-gap md-text">
              <li onClick={()=>navigate("/dashboard")}><FontAwesomeIcon icon={faDashboard} className="side-icons" value='Dashboard'/>Dashboard</li>
              <div>
              <li /* onClick={navigateTo} */><FontAwesomeIcon icon={faBox} className="side-icons"/>Products</li>
              <ul className='product-list sm-text column sm-gap'>
                  <li onClick={()=>navigate("/products")}>Product List</li>
                  <li onClick={()=>navigate("/create")}>Create Product</li>
                  <li onClick={()=>navigate("/deals")}>Deal Slideshow</li>
              </ul>
              </div>
              <li onClick={()=>navigate("/orders")}><FontAwesomeIcon icon={faCartShopping} className="side-icons"/>Orders</li>
              <li><FontAwesomeIcon icon={faPeopleGroup} className="side-icons"/>Customers</li>
              <li><FontAwesomeIcon icon={faGear} className="side-icons"/>Settings</li>
            </ul>
          </div>
       
            <nav className='right-section row sp-btw vert-center'>
              <input type="search" name="" id="" placeholder='search' />
              <div className='nav-icons row md-gap'>
              <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
       {/*          <img src={image} ></img> */}
                <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
              </div>
            </nav>
         </>
      )
}

export default Page

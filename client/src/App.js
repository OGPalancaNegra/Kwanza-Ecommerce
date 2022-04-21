import logo from './logo.svg';
import './App.css';
import './index.css';
import {BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import Home from './Pages/Home';
import Discount from "./Pages/Discount"
import Product from "./Pages/Product"
import ProductList from "./Pages/ProductList"

import { useEffect, useState } from 'react';
import axios from 'axios'
import Checkout from './Pages/Checkout';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Orders from './Pages/Orders';

function App() {

  const [discountedProducts, setDiscount] = useState([])

  const [windowSize, setWindowSize] = useState(window.innerWidth)

  useEffect(()=>{
    window.addEventListener("resize",()=>{
      setWindowSize(window.innerWidth)
    })
  },[windowSize])

  console.log(windowSize)

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



  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home discountedProducts={discountedProducts}/>}/>
        <Route path="/discount" element={<Discount discountedProducts={discountedProducts}/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/productlist" element={<ProductList/>}/>
        
        <Route path="/checkout" element={<Checkout windowSize/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/orders" element={<Orders/>}/>
        
     
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;


import './App.css';
import Register from "./pages/Register"
import "./index.css"
import {BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Page from './pages/Page';
import Login from './pages/Login';
import Products from './pages/Products';
import Create from './pages/Create';
import Product from './pages/Product';
import Edit from "./pages/Edit"
import Deals from './pages/Deals';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Orders from './pages/Orders';
import { useDispatch } from 'react-redux';
import NewPass from './pages/NewPass';

function App() {

  const [products, updateProducts] = useState([])
  const dipatch = useDispatch()

  useEffect(()=>{
    console.log("use effect ran")
    const getProducts = async ()=>{
        try {
            let res = await axios.get("http://localhost:5000/api/product/products")
           /*  if (filterObj.category === "" && filterObj.color=== "" && filterObj.size === ""){
                console.log("empty ran")
                res = await axios.get("http://localhost:5000/api/product/products")
            } else {
                console.log("non empty ran")
                res = await axios.get(`http://localhost:5000/api/product/products?category=${filterObj.category}&size=${filterObj.size}&color=${filterObj.color}`) 
              } */
              updateProducts(res.data)
 
        } catch{
            console.log("failed to get products")
        }
    }
    getProducts()
  },[dipatch])

  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard products={products}/>}>
            
          </Route>

          <Route path="/register" element={<Register/>}>

          </Route>

          <Route path="/login" element={<Login/>}>
            
          </Route>

          <Route path="/products" element={<Products products={products}/>}>
            
          </Route>

          <Route path="/create" element={<Create/>}>
            
            </Route>
            
          <Route path="/products/:productId" element={<Product/>}/>

          <Route path="/products/:productId/edit" element={<Edit/>}/>

          <Route path="/deals" element={<Deals/>}/>

          <Route path='/orders' element={<Orders/>}></Route>

          <Route path='/password-reset/:userId/:tokenId' element={<NewPass/>}></Route>
          
        </Routes>
      
      </BrowserRouter>
   
  );
}

export default App;

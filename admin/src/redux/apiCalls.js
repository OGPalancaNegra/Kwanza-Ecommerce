import axios from "axios"
import { useSelector } from "react-redux"
import { publicRequest } from "../axios"
import {storeAdmin, errorFound, fetching} from "./adminRedux"



export const registerAdmin = async (adminObj, img,dispatch, navigate) =>{
    try {
            dispatch(fetching())
            const res = await axios.post("http://localhost:5000/api/admin/register", {...adminObj,img})
            console.log("post sent")
            console.log(res.data)
            dispatch(storeAdmin(res.data))
            navigate("/dashboard")
    } catch {
        console.log("Registration failed")
        dispatch(errorFound())
    }  
}

export const loginUser = async (userInfo, navigate, dispatch) =>{
    try {
        const res = await axios.post("http://localhost:5000/api/admin/login", userInfo)
        console.log(res)
        dispatch(storeAdmin(res.data))
        navigate("/dashboard")
    }catch (err){
        console.log("Login Failed")
    }
}



export const postProduct = async (productObject, accessToken, adminId) =>{
    try {
        
        console.log("before post")
        const res = await axios.post("http://localhost:5000/api/product/create", productObject,{headers: {token:accessToken, userId: adminId}})
       // navigate("/create")
 
    } catch{
        console.log("Front End Create Product Error")
    }
}

/* export const getProducts = async (category)=>{
    try {
        const res = await axios.get(`http://localhost:5000/api/product/products?category=${category}`)

    } catch{

    }
}  */

export const editProduct = async (productInfo, productId, accessToken, adminId)=>{
    
    try {
        await axios.put(`http://localhost:5000/api/product/products/${productId}/edit`,productInfo, {headers: {token:accessToken, userId: adminId}})
        
    } catch {
        console.log("not eddited")
    }
}


export const deleteProduct = async (productId, accessToken, adminId)=>{
    try {
        await axios.delete(`http://localhost:5000/api/product/products/${productId}/delete`, {headers: {token:accessToken, userId: adminId}})
    }catch {
        console.log("couldnt delete product")
    }
}


export const updateDiscountPercentage = async (productId, percentageNum, accessToken, adminId)=>{
    try {
        axios.post(`http://localhost:5000/api/product/products/${productId}/delete`, percentageNum,{headers: {token:accessToken, userId:adminId}})
    }catch (e) {
        console.log(e)
    }
}


export const requestNewPassword = async (email, setMsg) =>{
    try {
        const res = await axios.post("http://localhost:5000/api/password-reset/", {email})
 
    } catch(e) {
        console.log(e)
    }
}


export const postNewPassword = async (userId, tokenId,password,dispatch, navigate) =>{
    try {
        const res = await axios.post(`http://localhost:5000/api/password-reset/${userId}/${tokenId}`,{password})
        
        dispatch(storeAdmin(res.data))
        navigate("/dashboard")

    } catch {

    }
}

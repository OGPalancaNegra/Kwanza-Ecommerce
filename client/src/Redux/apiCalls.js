import axios from "axios"
import { storeUserInRedux } from "./userRedux"


export const editProduct = async (productInfo, productId)=>{
    try {
        await axios.put(`http://localhost:5000/api/product/products/${productId}/edit`,productInfo)
    } catch {
        console.log("not eddited")
    }
}


export const postUserData = async (dispatch, userData) =>{
    try {
        const user = await axios.post(`http://localhost:5000/api/client/register`,userData)
        console.log("request sent")
        dispatch(storeUserInRedux(user.data))
    } catch {
        console.log("couldnt send request")
    }
}


export const postLogin = async (userData, dispatch, navigate) =>{
    try {
        const user = await axios.post(`http://localhost:5000/api/client/login`,userData)
        console.log("request sent")
        dispatch(storeUserInRedux(user.data.userId))
        navigate(user.data.redirectPath)
        console.log(user.data)
    } catch {
        console.log("didnt work")
    }
}

export const postReview = async (review, productId)=>{
    try {
        const res = await axios.post(`http://localhost:5000/api/review/${productId}`, review)
        window.location.reload(false)
    } catch {
        console.log("review post not sent")
    }
}

export const getAllProductReviews = async (productId, setProductReviews)=>{
    try {
        const res = await axios.get(`http://localhost:5000/api/review/${productId}`)
        setProductReviews(res.data)
    } catch {
        console.log("get to reviews not sent")
    }
}

export const deleteProductReview = async (reviewId, productId)=>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/review/${reviewId}/${productId}`)
        
    } catch {
        console.log("delete request not sent")
    }
}
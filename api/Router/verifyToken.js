const jwt = require("jsonwebtoken")
/* const express = require("express")
const app = express()
const cors = require("cors");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); */


const verifyToken = (req,res,next) =>{
    console.log("verifying token....")
    
    const token = req.headers.token
    //console.log(token)
    if (!token) {
        return res.status(403).send("A token is required for authentication");
      }

    try {
        const decoded = jwt.verify(token, "password")
       // console.log(decoded)
        req.user= decoded
        
    } catch (err) {
        return res.status(401).send("invalid token")
    }
    return next()
}

const verifyTokenAndId = (req,res,next) =>{
    console.log("verifying User ID...")
    verifyToken(req,res, ()=>{
        if (req.user.id === req.headers.userId){
            next()
        } else {
            res.status(403).json("Your ID dont match the required one to do this!");
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    console.log("verifying Admin")
    verifyToken(req,res,()=>{
        //console.log(req)
        if (req.user.isAdmin){
            next()
        } else {
            res.status(403).json("You are not AN ADMIN");
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndId,
    verifyTokenAndAdmin
  };
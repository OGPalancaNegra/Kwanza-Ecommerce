const router = require("express").Router()
const bcrypt = require("bcrypt")
const Admin = require("../Model/Admin")
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")
const {verifyToken} = require("./verifyToken")
const session = require("express-session")
const express = require("express");
const app = express()
//const { cookie } = require("express/lib/response");



router.post("/register", async (req,res, next)=>{
       
        console.log("post method ran")
        const {username, email, password, img} = req.body
        const hashedPass = CryptoJS.AES.encrypt(password, "password").toString()

        const newAdminInst = new Admin({username,email, hashedPass, profileImg:img})
       
        try {
             await newAdminInst.save()
            

             const accessToken = jwt.sign({
                adminId: newAdminInst._id,
                isAdmin: true
            },"password",{expiresIn:"2h"})   

        
          console.log("saving user id in session now")


          const {hashedPass, ...others} = newAdminInst._doc

          res.status(200).json({...others, accessToken});

        } catch (e){
            res.status(401).json("couldnt register user")
            console.log(e)
        }
})

router.post("/login", async (req,res)=>{
    console.log("loggin user in with....", req.body, "body")

    try {
        
        const {email, password} = req.body
        const foundPassword = await Admin.findOne({email: {$in: email }})
    
        const decryptedPass = CryptoJS.AES.decrypt(foundPassword.hashedPass, "password").toString(CryptoJS.enc.Utf8)
       
        if (password === decryptedPass){
            console.log("password is correct")
            
        const accessToken = jwt.sign({
                adminId: foundPassword._id,
                isAdmin: true
            },"password",{expiresIn:"2h"}) 

           
        const {hashedPass, ...others} = foundPassword._doc

        res.status(200).json({...others,accessToken});

        } else {
            res.status(401).json("Wrong credentials!");
        }
    } catch (e){
        res.status(500).json(e)

    }
  
})


router.get("/:adminId", async (req,res)=>{
    
    console.log("getting admin id...")
    const foundAdmin = await Admin.findById(req.params.adminId)
   
    res.send(foundAdmin.email)
    })

module.exports = router
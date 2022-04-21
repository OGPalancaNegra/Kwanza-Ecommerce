const router = require("express").Router()
const Client = require("../Model/Client")
const session = require("express-session")
//const passport = require("passport")
const jwt = require("jsonwebtoken")

const CryptoJs = require("crypto-js")
const { JsonWebTokenError } = require("jsonwebtoken")


router.post("/register", async(req,res)=>{
    console.log(req.body)
    const {name, email, password, recieveEmail} = req.body
    
    const emailCheck = Client.find({email: email})
    console.log(emailCheck.email)
    if (!emailCheck.email) {
        const hashedP = CryptoJs.AES.encrypt(password, "password").toString()

        const newClient = await new Client({name, email, recieveEmail, hashedP})
       // Client.register(newClient,password)


        newClient.save()

        const accesstoken = jwt.sign({
            userId: newClient._id
        },"password",{expiresIn:"2h"})

        const {password, ...others} = newClient._doc

        res.send({accesstoken, ...others}) 
        console.log("new email created")
    } else {
        res.send("Email Already In Use")
        console.log("email taken")
    }

   
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body

    const foundUser = await Client.findOne({email:email})
  
    
    const unHashedP = CryptoJs.AES.decrypt(foundUser.hashedP, "password").toString(CryptoJs.enc.Utf8)
    


    console.log(unHashedP)
 
    if (password === unHashedP){

        // redirect to whereever he was or Homepage

        const accesstoken = jwt.sign({
            userId: foundUser._id
        },"password",{expiresIn:"2h"})

        const {password, ...others} = foundUser._doc

       // res.send({accesstoken, ...others}) 

        res.send({userId: foundUser._id, accesstoken,redirectPath: "/"})
        console.log({userId: foundUser._id, redirectPath: "/"})
    } else {
        res.send("wrong password")
        console.log("wrong password")
    } 

   
   // res.send("/",foundUser._id)
})


module.exports = router
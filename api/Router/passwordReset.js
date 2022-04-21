
const Admin = require("../Model/Admin");

const sendEmail = require("../utils/sendEmail");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const CryptoJs = require("crypto-js")


router.post("/", async (req, res) => {

    console.log(req.body)

     try {

        const user = await Admin.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

   
        const passwordToken =  jwt.sign({
            userId: user._id
        },"password",{expiresIn:"1h"})

        const link = `http://localhost:3000/password-reset/${user._id}/${passwordToken}`;
        
        await sendEmail(user.email, "Password reset", link);
        
        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    } 
});


router.post("/:userId/:tokenId", async (req, res) => {

    console.log("storing a new password...")
    try {
 /*        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message); */

        const user = await Admin.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

       /*  const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired"); */

        const decoded = jwt.verify(req.params.tokenId, "password")
        console.log(decoded)

        if (decoded.userId === req.params.userId){

            const hashedP = CryptoJs.AES.encrypt(req.body.password, "password").toString()
           
            user.hashedPass = hashedP;

            await user.save();

            const accessToken = jwt.sign({
                adminId: user._id,
                isAdmin: true
            },"password",{expiresIn:"1d"})

        
            const {hashedPass, ...others} = user._doc
            res.send({accessToken,...others});
            // delete passowrd token ting
        } 
        
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


module.exports = router
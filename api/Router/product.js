const router = require("express").Router()
const Product = require("../Model/Product")
const multer = require("multer")
const upload = multer({dest:"uploads/"})
const cors = require('cors')
const { findById, findByIdAndUpdate, findByIdAndDelete } = require("../Model/Product")
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndId } = require("./verifyToken")

const Review = require("../Model/Review")


/* !!! SHOULD BE QUERY INSTEAD OF USING REQ.BODY */

router.put("/products/:id/edit",verifyTokenAndAdmin,async (req,res)=>{
  console.log("editting product")
  console.log(req.body)
  const productId = req.params.id

  //console.log(Object.keys(req.body)[0])


  // if percentage num changed update just it
  const percentageNum =  req.body.discountPercentage

  const foundProduct = await Product.findById(productId)
  const foundPercentageNum = foundProduct.percentageNum
 
  
  /// if req.body has just  NOT

  // get found in Stock value to toggle

  const foundInStock = foundProduct.inStock
  const foundSlideShowInfo = foundProduct.displayOnSlideShow
  const foundProductViews = foundProduct.productViews
  console.log(foundSlideShowInfo)
  
  try {

    if (percentageNum === foundPercentageNum) {
      console.log("everything changed")
        const edittedProduct = await Product.findByIdAndUpdate(productId, req.body)
        edittedProduct.save() 
    } else if (Object.keys(req.body)[0] === "discountPercentage")  {
       console.log("discountChanged")
       const edittedProduct = await Product.findByIdAndUpdate(productId, {percentageNum:percentageNum})
       edittedProduct.save() 
    } else if (Object.keys(req.body)[0] === "inStock"){
      console.log("Stock Changed!")
      const edittedProduct = await Product.findByIdAndUpdate(productId, {inStock: !foundInStock})
      edittedProduct.save()
      // displayOnSlideShow
    } else if (Object.keys(req.body)[0] === "displayOnSlideShow"){
      console.log("toggling display slideshow")
      const edittedProduct = await Product.findByIdAndUpdate(productId, {displayOnSlideShow: !foundSlideShowInfo})
      edittedProduct.save()
    } else if (Object.keys(req.body)[0] === "productViews") {
      console.log("Adding +1 View To Product")
      let newProductView = foundProductViews + 1
      const edittedProduct = await Product.findByIdAndUpdate(productId, {productViews: newProductView })
      edittedProduct.save()
      console.log(edittedProduct.productViews)
    } else {
      console.log("everything changed")
      const edittedProduct = await Product.findByIdAndUpdate(productId, req.body)
      edittedProduct.save() 
    }

  } catch(e) {
    console.log(e)
  }
  
})

router.delete("/products/:id/delete",async (req,res)=>{
  console.log("Deleting Product and Its Reviews")
  const productId = req.params.id
  try {
    await Product.findByIdAndDelete(productId)
    console.log("succefully deleted product")

  
    await Review.deleteMany({productId: {$in: productId}})
    console.log("succefully deleted reviews mathcing product id")
    //
  } catch (e){
    console.log(e)
  }
  //find 
  
  console.log(req.params.id)
})


router.get("/products/:id", async (req,res)=>{
  
  try {
    const foundProduct= await Product.findById(req.params.id).populate("reviews")
    
    res.send(foundProduct)
  } catch {
    console.log("couldnt find data")
  }
})


router.post("/create",verifyTokenAndAdmin,async (req,res)=>{
    console.log(req.body)
    console.log(req.headers)

    const {categories, images, name, description, price, quantity, colors, sizes} = req.body
    console.log("backend recieved")

    const newProduct =  new Product({name, description, price, quantity, images, categories, colors, sizes})
  
    await newProduct.save() 

  //  console.log(newProduct)
})


router.get("/products",async (req,res)=>{
  
   // console.log(req.user)

    let product

    if (req.query.isDiscounted){
      product = await Product.find({percentageNum: {$gt: 0}})
      console.log("got discounted item")
    }  else if (req.query.last5){
      product = await Product.find().sort({createdAt: -1}).limit(8)
    } else if (req.query.category){
      product = await Product.find({categories: {$in : req.query.category}})
      console.log("got categoried items")
    } else if (req.query.mostViewed){
      product = await Product.find().sort({productViews: -1}).limit(8)
      console.log("most viewed products gotten")
    } else if (req.query.mostPopular){
      product = await Product.find().sort({productSold: -1}).limit(5)
      console.log("most Popular Products gotten")
     // console.log(req.session.user_id)
    } 
    else if (req.query) {
      product= await Product.find()
      console.log("got every items")
    }

    res.send(product)

 

   

})

module.exports = router
const Product = require("../Model/Product")
const Review = require("../Model/Review")

const router = require("express").Router()


router.post("/:productId", async (req,res)=>{
    console.log("recieved Post request")
    console.log(req.body)

    if (!req.body){
        res.status(400).send("No Review Sent")
    }

    const foundProduct = await Product.findById(req.params.productId)



    const newReview = new Review(req.body)

    foundProduct.reviews.push(newReview)

    await foundProduct.save()

    await newReview.save()
 
    console.log(foundProduct)


    res.send("review saved")
})


router.get("/:productId", async (req,res)=>{


    console.log("getting all product reviews", req.params.productId)
    

    const allProductReviews = await Review.find({productId: req.params.productId}).populate("clientId")

    
    /* const allProductReviews = await Review.aggregate([
        {
            $match : {
                productId: req.params.productId
            }
        ,},
        { $group: {
            rating: "$rating",
            comment: "$comment",
            name:""
           
          }, 
        }
    }]) 
 */
    console.log(allProductReviews)
    
    res.send(allProductReviews)

    // send an array ({rating, comment, username}) with aggregate
})

router.delete("/:reviewId/:productId",async (req,res)=>{

    // delete the review Data in Review Model

    const deletedReview = await Review.findByIdAndDelete(req.params.reviewId)
    //deletedReview.save()

    // delete the Review Data in Parent Product Model
    const deletedReviewInProduct = await Product.findByIdAndUpdate(req.params.productId,{$pull:{reviews: req.params.reviewId}})
   // deletedReviewInProduct.save()
    // pull reviews with 


})


module.exports = router

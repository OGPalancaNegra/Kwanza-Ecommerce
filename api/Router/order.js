const router = require("express").Router()
const { type } = require("express/lib/response");
const Admin = require("../Model/Admin");
const { findByIdAndUpdate, findById } = require("../Model/Order");
const Order = require("../Model/Order");
const Product = require("../Model/Product");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndId } = require("./verifyToken");
//app.use(express.urlencoded({ extended: true }));


router.post("/",async (req,res)=>{

    try {
        console.log("saving order")

        const newOrder = await new Order(req.body)
        newOrder.save()

       /*  req.body.products.forEach(async el=>{
            console.log(el.productId)
            const foundProduct = await Product.findById(el.productId)
            const newSold = parseInt(foundProduct.productSold) + parseInt(el.quantity)
            const edittedProduct = await Product.findByIdAndUpdate(el.productId, {productSold: newSold})
            edittedProduct.save()

       
        }) */
    } catch (e) {
        console.log(e)
    }
   
    res.send("done")
})


router.get("/income",verifyTokenAndAdmin,async (req,res)=>{
    console.log("getting total income")

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    
    const totalsales = await Order.aggregate([
      /*   {
            $match: {
                createdAt: {$gte: previousMonth}
            }
            
        }, */
        { 
         $project: {
           day: {$dayOfWeek: "$createdAt"},
           income:"$amount"}  
       },  
     { $group: {
           _id: "$day",
           amount: {$sum:"$income" },
          
         }, 
       }
   ])
   res.send(totalsales)
})

router.get("/orders",verifyTokenAndAdmin,async (req,res)=>{
    console.log("getting every Order...")
    console.log(req.user)
    console.log(req.headers.token)
    const last5Orders = req.query.last5
    let orders
    if (last5Orders){
        orders= await Order.find({}).sort({createdAt: -1}).limit(5)
    } else {
        orders= await Order.find({})
    }
    console.log("sending orders now")
    res.send(orders)
})

router.get("/mostOrdered",async (req,res)=>{
    console.log("getting every Order...")
    console.log(req.user)
    console.log(req.headers.token)
    const allOrders = await Order.find()

    let orderedProducts = []

    allOrders.forEach(el=>{
        orderedProducts.push(...el.products)
    })

    let uniqueIds2 = []
    let uniqueProducts = []


    orderedProducts.forEach(orderedProduct=>{
        console.log("looping through each ordered product")
        const isDuplicate = uniqueIds2.includes(orderedProduct.productId)
        console.log(isDuplicate)
        if (isDuplicate){
            console.log("duplicate found")
             // find id in unique products matching and add both quanitites
             const foundProduct = uniqueProducts.find(product=> product.productId === orderedProduct.productId)
             foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(orderedProduct.quantity)
             
            
             //uniqueProducts.filter(el=>el.productId !== orderedProduct.productId)
         
             uniqueProducts.push(foundProduct)

        } else if (!isDuplicate) {
            uniqueProducts.push(orderedProduct)
            uniqueIds2.push(orderedProduct.productId)
            return true
        }
    })

    const uniqueIds = [];
    const unique = uniqueProducts.filter(element => {
    const isDuplicate = uniqueIds.includes(element.productId);

    if (!isDuplicate) {
      uniqueIds.push(element.productId);
      return true;
    } 
    })

    console.log("sending orders now")
    const mostOrdered = unique.sort((a,b)=>b.quantity - a.quantity).slice(0,5)
    res.send(mostOrdered)
})


router.get("/product/:productId",verifyTokenAndAdmin,async (req,res)=>{
    // get all orders with productId in the ting?

    const productId = req.params.productId
    
    const ordersOfProduct = await Order.find({products: {$elemMatch:{productId: productId}}})

  /*   const productArray = ordersOfProduct.map(el=>{
        return el.products
    }) */

    let newArray = []

    ordersOfProduct.forEach((el)=>{
        newArray.push(...el.products)
    })
   
    const justAirJ = newArray.filter(el=>el.productId === productId)

    res.send(justAirJ)
    // products = [{productId:"airforce", quantity:1, price:189.05},{productId:"airforce", quantity:1, price:189.05},]

})

router.get("/:userId",async (req,res)=>{

    console.log("get orders ran")
    try {
        console.log("getting user orders")
        const userOrders =  await Order.find({userId: req.params.userId})
        
        res.send(userOrders)
        console.log(userOrders)
    } catch (e) {
        console.log("couldnt get any orders", e)
    }
    
})





module.exports = router
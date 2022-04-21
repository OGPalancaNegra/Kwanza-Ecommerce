const mongoose = require("mongoose")
const Review = require("./Review")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    images : {
        type: Array
    },
    categories: {
        type: Array,
        required: true
    },
    colors : {
        type: Array,
        required: true
    },
    sizes: {
        type: Array,
        required: true,
    
    },
    inStock: {
        type: Boolean,
        default: true

    },
    percentageNum: {
        type: Number,
        default: 0
    },
    isDiscounted: {
        type: Boolean,
        default: false
    },
    displayOnSlideShow: {
        type: Boolean,
        default: false
    },
    productViews :{
        type: Number,
        default: 0
    },
    productSold: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref:"review"
        }
    ]
},{timestamps: true})

/* productSchema.post("findOneAndDelete", (productToDelete)=>{

   // Review.deleteMany({})
})
 */

module.exports = mongoose.model("product", productSchema)
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const adminRoute = require("./Router/admin");
const productRoute = require("./Router/product");
const clientRoute = require("./Router/client")
const paymentRoute = require("./Router/stripe")
const orderRoute = require("./Router/order")
const passwordResetRoute = require("./Router/passwordReset")
const reviewRoute = require("./Router/review")
const cors = require("cors");
const passport = require("passport")
const Client = require("./Model/Client")
const LocalStrategy = require("passport-local")
const session = require("express-session")
var cookieParser = require('cookie-parser');



mongoose.connect('mongodb://localhost:27017/ecommerce2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(console.log('mongo connected again'))
    .catch(error => console.log(error))

//handling error after inital connection
mongoose.connection.on('error', err=>{
    console.log(err)
})

/* // redis@v4
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error) */


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


/* 
app.use(cookieParser())

var MemoryStore = session.MemoryStore */

app.use(passport.initialize())

/* app.set('trust proxy', 1)
app.use(session({
    name:"session",
    secret: 'secret',
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true,
    cookie: {maxAge:3900000,secure:true},})) */

//configure passport
/* passport.use(new LocalStrategy(Client.authenticate()))
passport.serializeUser(Client.serializeUser())
passport.deserializeUser(Client.deserializeUser()) */



app.use("/api/client", clientRoute)
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute)

app.use("/api/checkout", paymentRoute)
app.use("/api/order", orderRoute)
app.use("/api/password-reset", passwordResetRoute)
app.use("/api/review", reviewRoute)

/* app.get("/dummy",(req,res)=>{
    console.log("working")
}) */


app.listen(5000, ()=>{
    console.log(`listening to requests on port ${5000}`)
})

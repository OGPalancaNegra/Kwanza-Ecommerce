const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
//const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")("***");

router.post("/payment", (req, res) => {

    console.log("taking payment on backend")
    console.log(req.body)
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount*100,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr)
        res.status(500).json(stripeErr);
      } else {
          console.log("successfull")
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
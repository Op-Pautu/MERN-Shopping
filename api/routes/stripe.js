const router = require("express").Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post('/payment', (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    }
    )
})


// const YOUR_DOMAIN = "http://localhost:5000";

// router.post("/payment", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     source: req.body.tokenId,
//     amount: req.body.amount,
//     currency: "usd",
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

module.exports = router;

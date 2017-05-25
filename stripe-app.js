'use strict';

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const app = require("express")();
const stripe = require("stripe")(keySecret);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post("/******", (req, res) => {

  let amount = ****;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  }).then(customer =>
    stripe.charges.create({
      amount,
      description: "Strategy Module",
      currency: "usd",
      customer: customer.id
    })).then(charge => res.send('success'))
});

module.exports = app;
const express = require('express');
const Razorpay = require('razorpay');

const cors = require('cors');

// Allow requests from 'http://127.0.0.1:5500'

const app = express();
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  })
);

app.use(express.json());
app.listen(4000, () => console.log(`server is up and running...`));

app.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
  // res.render('./index.html');
});

app.post('/order', async (req, res) => {
  let amount = req.body.amount;
  var instance = new Razorpay({
    key_id: 'rzp_test_ImtKCqXKk92nhZ',
    key_secret: process.env.key_secret,
  });

  var options = {
    amount: amount * 100,
    currency: 'INR',
    receipt: 'receipt#1',
  };

  let myOrder = await instance.orders.create(options);

  res.status(200).json({
    order: 'myOrder',
  });
});

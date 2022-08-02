require('dotenv').config();
const midtransClient = require('midtrans-client');
const { User, Payment, Package } = require('../models');

const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;

const generatePayment = async (req, res) => {
  const d = new Date();
  const YY = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d);
  const MM = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  const DD = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  const users = await User.findAll({
    where: {
      isAdmin: 0,
    },
    include: [Package],
  });
  const payments = [];
  users.forEach((user) => {
    const paymentId = `NET-${YY}${MM}${DD}${user.phone}`;
    const payment = { payment_id: paymentId, userId: user.id };
    payments.push(payment);
  });
  Payment.bulkCreate(payments)
    .then((result) => res.status(201).send({ message: 'Payment Generated Successfully', count: result.length }))
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const getPayment = async (req, res) => {
  const paymentId = req.params.payment_id;
  const { user } = req;

  const payment = await Payment.findByPk(paymentId);
  if (payment.paid) {
    return res.send({ payment, user });
  }
  const snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: SERVER_KEY,
  });
  const parameter = {
    transaction_details: {
      order_id: payment.payment_id,
      gross_amount: user.package.price,
    },
    credit_card: {
      secure: false,
    },
    customer_details: {
      full_name: user.name,
      email: user.email,
      phone: user.phone,
    },
  };
  snap.createTransaction(parameter)
    .then((transaction) => {
      // transaction token
      const { token } = transaction;
      res.send({ payment, token, key: CLIENT_KEY });
    });
};

const getAllPayments = (req, res) => {
  Payment.findAll({
    where: {
      userId: req.user.id,
    },
  }).then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(500).send({
      message: err.message,
    });
  });
};

module.exports = { getPayment, generatePayment, getAllPayments };

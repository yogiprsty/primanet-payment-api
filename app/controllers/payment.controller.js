require('dotenv').config();
const midtransClient = require('midtrans-client');
const { User, Payment, Package } = require('../models');

const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;

const generatePayment = async (req, res) => {
  const d = new Date();
  const users = await User.findAll({
    where: {
      isAdmin: 0,
    },
    include: [Package],
  });
  const payments = [];
  users.forEach((user) => {
    const packageSlug = user.package.name.replace(/\s/g, '').toLowerCase();
    const paymentId = `${d.getDay()}${d.getMonth()}${d.getFullYear()}-${user.id}-${packageSlug}`;
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

const getPayments = async (req, res) => {
  const paymentId = req.params.payment_id;
  const { user } = req;

  if (paymentId) {
    const payment = await Payment.findByPk(paymentId);
    if (payment.paid) {
      return res.send(payment);
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
    return;
  }

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

module.exports = { getPayments, generatePayment };

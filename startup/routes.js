const express = require('express');
const orders = require('../routes/order');

module.exports = (app) => {
  app.use(express.json());
  app.use('/api/orders', orders);
};

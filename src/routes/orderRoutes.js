const express = require("express");
const Order = require("../model/Order");
const { placeOrder, checkStatus } = require("../controllers/orderController");
const router = express.Router();

router.post('/placeOrder', placeOrder)
router.post('/checkOrderStatus', checkStatus)

module.exports = router;
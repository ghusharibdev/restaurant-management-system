const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  items: [
    {
      itemId: {
        type: String,
        ref: 'Menu'
      },
      itemName: String,
      price: Number,
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: Number,
  customerName: String,
  status:{
    type: String,
    enum: ['waiting','accepted','preparing', 'prepared'],
    default: 'waiting'
  }
},
  {
    timestamps: true
  }
);

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;

const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
  items: [
    {
      itemId: {
        type: String,
        ref: "Menu",
      },
      stock: Number,
      totalAmount: Number,
    },
  ],
});

const Inventory = new mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;

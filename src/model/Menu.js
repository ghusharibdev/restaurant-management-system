const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  itemName: String,
  price: Number,
});

const Menu = new mongoose.model("Menu", menuSchema);

module.exports = Menu;

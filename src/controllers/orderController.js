const Order = require("../model/Order");
const Menu = require("../model/Menu");
const Inventory = require("../model/Inventory");

const mongoose = require("mongoose");

const placeOrder = async (req, res) => {
  try {
    const { itemId, quantity, customerName } = req.body;
    const menuItem = await Menu.findById(itemId);
    if (!menuItem) return res.status(404).send("Item not found!");
    const totalAmount = menuItem.price * quantity;
    const findInInventory = await Inventory.findOne({ "items.itemId": itemId });
    if (!findInInventory) return res.status(404).send("Item not in inventory!");

    const findStock = findInInventory.items.find(
      (item) => item.itemId == itemId
    );
    if (!findStock || findStock.stock < quantity)
     return res.status(404).send("Out of stock!");
    const newOrder = new Order({
      items: [{ itemId: new mongoose.Types.ObjectId(itemId), quantity }],
      customerName,
      totalAmount: totalAmount,
    });

    const savedOrder = await newOrder.save();
    if (!savedOrder) return res.status(400).send("Order failed!");
    await Inventory.findOneAndUpdate(
      { "items.itemId": new mongoose.Types.ObjectId(itemId) },
      {
        $inc: {
          "items.$.stock": -quantity,
          "items.$.totalAmount": -(quantity * menuItem.price),
        },
      },
      { new: true }
    );

    await savedOrder.populate("items.itemId", "itemName price");
    res.json({
      savedOrder,
      message: "Order placed Successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

const checkStatus = async (req, res) => {
  const findStatus = await Order.findById({ _id: req.body.orderId });
  if (!findStatus) {
    return res.sendStatus(404);
  }
  res.send(findStatus.status);
};

module.exports = { placeOrder, checkStatus };

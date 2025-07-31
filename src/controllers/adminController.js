const Inventory = require("../model/Inventory");
const Menu = require("../model/Menu");
const Order = require("../model/Order");
const Table = require("../model/Table");
var tableCount = 1;

const addMenuItem = async (req, res) => {
  const { body: item } = req;
  const newItem = new Menu({ itemName: item.itemName, price: item.price });
  try {
    const savedItem = await newItem.save();
    if (savedItem) {
      return res.json({
        message: "Item added to menu successfully!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const changeOrderStatus = async (req, res) => {
  const updateStatus = await Order.findOneAndUpdate(
    { _id: req.body.orderId },
    { status: req.body.status }
  );
  if (!updateStatus) {
    return res.sendStatus(404);
  }

  res.send("Status updated successfully!");
};

const addTable = async (req, res) => {
  const { capacity, status } = req.body;
  const newTable = new Table({
    tableNumber: tableCount,
    capacity,
    status,
  });
  const savedTable = await newTable.save();
  tableCount++;
  if (!savedTable) {
    return res.sendStatus(500).json({
      message: "Something went wrong!",
    });
  }

  res.send(`Table added: ${savedTable}`);
};

const addInventory = async (req, res) => {
  try {
    const { itemId, stock } = req.body;

    const menu = await Menu.findById(itemId, "itemName price");
    if (!menu) return res.status(404).json({ message: "Menu item not found" });

    const existing = await Inventory.findOne({ "items.itemId": itemId });
    if (existing) {
      return res.status(400).json({ message: "Item already in inventory" });
    }

    const totalAmount = menu.price * stock;
    const inventory = new Inventory({
      items: [{ itemId, stock, totalAmount: totalAmount }],
    });
    await inventory.save();
    await inventory.populate("items.itemId", "itemName price");

    return res.json({
      items: inventory.items,
      message: "Item included successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};

const viewInventory = async (req, res) => {
  try {
    const inv = await Inventory.find({})
      .populate("items.itemId", "itemName price")
      .lean();

    const allItems = [];
    for (const i of inv) {
      for (const item of i.items) {
        allItems.push({
          itemName: item.itemId.itemName,
          price: item.itemId.price,
          stock: item.stock,
          totalAmount: item.totalAmount,
        });
      }
    }

    res.json(allItems);
  } catch (err) {
    console.log(err);
  }
};

const editInventory = async (req, res) => {
  try {
    const { itemId, stock } = req.body;
    const menuItem = await Menu.findById(itemId);
    if (!menuItem) res.status(404).send("No item found in Menu!");
    const totalAmount = menuItem.price * stock;

    const updateInv = await Inventory.findOneAndUpdate(
      { "items.itemId": itemId },
      { $set: { "items.$.stock": stock, "items.$.totalAmount": totalAmount } },
      { new: true }
    );
    if (!updateInv) res.status(400).send("Couldn't update!");
    await updateInv.populate("items.itemId", "itemName price");

    res.json({ updateInv, message: "Inventory updated successfully!" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addMenuItem,
  changeOrderStatus,
  addTable,
  addInventory,
  viewInventory,
  editInventory,
};

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
      console.log(savedItem);
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
    status
  })
  const savedTable = await newTable.save();
  tableCount++;
  if (!savedTable){
   return res.sendStatus(500).json({
      message: "Something went wrong!"
    })
  }

  res.send(`Table added: ${savedTable}`)
};

const addTble = async (req, res) => {};

const addTale = async (req, res) => {};

module.exports = {
  addMenuItem,
  changeOrderStatus,
  addTable,
};

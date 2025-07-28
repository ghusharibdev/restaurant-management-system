const Order = require("../model/Order");
const Menu = require("../model/Menu");

const placeOrder = async (req, res) => {
  try {
    const { items, customerName } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Invalid items array" });
    }

    let totalAmount = 0;
    const itemsWithPrices = await Promise.all(
      items.map(async (item) => {
        const menuItem = await Menu.findById(item.itemId);
        if (!menuItem) {
          throw new Error(`Item not found: ${item.itemId}`);
        }

        totalAmount += menuItem.price * item.quantity;

        return {
          itemId: item.itemId,
          itemName: menuItem.itemName,
          price: menuItem.price,
          quantity: item.quantity,
        };
      })
    );

    const newOrder = new Order({
      items: itemsWithPrices,
      totalAmount,
      customerName,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

  const checkStatus=  async(req,res)=>{
  const findStatus = await Order.findById({_id: req.body.orderId});
  if (!findStatus){
    return res.sendStatus(404);
  }
  res.send(findStatus.status)

}

module.exports = { placeOrder, checkStatus };

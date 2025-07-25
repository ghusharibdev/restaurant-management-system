const Menu = require("../model/Menu");

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

module.exports = {
  addMenuItem,
};

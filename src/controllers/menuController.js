const Menu = require("../model/Menu");

const getAllMenu = async (req, res) => {
  const item = await Menu.find({});
  if (item) {
    return res.json(item);
  }
  res.sendStatus(404);
};

const getItembyId = async (req,res) => {
    const findItem = await Menu.findOne({_id: req.params.id})
    if (findItem){
        return res.json(findItem)
    }
    res.sendStatus(404)
}

module.exports = {
  getAllMenu,
  getItembyId
};

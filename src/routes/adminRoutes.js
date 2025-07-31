const express = require("express");
const Menu = require("../model/Menu");
const { addMenuItem, changeOrderStatus, addTable, addInventory, viewInventory, editInventory } = require("../controllers/adminController");
const router = express.Router();

router.post("/addMenuItem", addMenuItem);
router.put('/changeOrderStatus', changeOrderStatus)
router.post('/addTable', addTable)
router.post('/addInventory', addInventory)
router.get('/viewInventory', viewInventory)
router.put('/updateInventory', editInventory)

module.exports = router;

const express = require("express");
const Menu = require("../model/Menu");
const { addMenuItem, changeOrderStatus, addTable } = require("../controllers/adminController");
const router = express.Router();

router.post("/addMenuItem", addMenuItem);
router.put('/changeOrderStatus', changeOrderStatus)
router.post('/addTable', addTable)

module.exports = router;

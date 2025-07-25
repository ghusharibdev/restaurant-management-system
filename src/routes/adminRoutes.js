const express = require("express");
const Menu = require("../model/Menu");
const { addMenuItem } = require("../controllers/adminController");
const router = express.Router();

router.post("/addMenuItem", addMenuItem);

module.exports = router;

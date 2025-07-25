const express = require("express");
const Menu = require("../model/Menu");
const { getAllMenu, getItembyId } = require("../controllers/menuController");
const router = express.Router();

router.get("/getMenu", getAllMenu);
router.get('/getItem/:id', getItembyId)

module.exports = router;

const express = require("express");
const { getAvailableTables, reserveTable } = require("../controllers/reservationController");
const router = express.Router();

router.get('/getAvailableTables', getAvailableTables)
router.post('/reserveTable', reserveTable)

module.exports = router;

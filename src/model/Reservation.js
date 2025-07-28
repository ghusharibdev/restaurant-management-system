const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  customerName: String,
  customerContact: String,
  resDateTime: { type: Date, default: Date.now() },
  duration: Number,
  noOfSeats: Number,
  tableId: {
    type: String,
    ref: "Table",
  },
});

const Reservation = new mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;

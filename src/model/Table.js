const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
  tableNumber: { type: Number },
  capacity: Number,
  status: {
    type: String,
    enum: ["reserved", "occupied", "available"],
    default: "available",
  },
});

const Table = new mongoose.model("Table", tableSchema);

module.exports = Table;

const Reservation = require("../model/Reservation");
const Table = require("../model/Table");

const getAvailableTables = async (req, res) => {
  const findTable = await Table.find({ status: "available" });
  if (!findTable)
    return res.sendStatus(404).json({
      message: "No table available :(",
    });

  res.send(findTable);
};

const reserveTable = async (req, res) => {
  try {
    const { customerName, customerContact, duration, noOfSeats } = req.body;

   const availableTables = await Table.find({ status: "available" });
    if (availableTables.length == 0) {
      return res.send("No table available!");
    }

    for(const table of availableTables){
      if (table.capacity >= noOfSeats) {
        const newReserve = new Reservation({
          customerName,
          customerContact,
          duration,
          noOfSeats,
          tableId: table._id,
        });
        const savedRes = await newReserve.save();
        await Table.findByIdAndUpdate(table._id, {status: 'reserved'})
        if (!savedRes) return res.sendStatus(403).send("Couldn't reserve");
        return res.send("Reserved!");
      }
    };
    return res.sendStatus(500)
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAvailableTables,
  reserveTable,
};

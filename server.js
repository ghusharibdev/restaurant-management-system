const express = require("express");
const menuRouter = require("./src/routes/menuRouters");
const app = express();
const mongoose = require("mongoose");
const adminRouter = require("./src/routes/adminRoutes");
const reservationRouter = require("./src/routes/reservationRoutes");
const orderRouter = require("./src/routes/orderRoutes");

app.use(express.json());
app.use(menuRouter, orderRouter, reservationRouter);
app.use("/admin", adminRouter);
(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ghusharib:allied11m@cluster0.y3gibzq.mongodb.net/"
    );
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
  }
})();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

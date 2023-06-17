const express = require("express");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const mongoose = require("mongoose");
// const dbconfig = require("./db")
const roomsRoute = require("./routes/roomsRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoutes");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingRoute);
app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
);

// mongoose.connect((process.env.MONGO_URL ), {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((err) => {
//   console.error('Failed to connect to MongoDB:', err);
// });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB not connected"));

// app.listen(5000, console.log(`server running in port 5000`.yellow))
const port = process.env.PORT || 5000;

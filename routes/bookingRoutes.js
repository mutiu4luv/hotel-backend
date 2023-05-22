const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const Room = require("../models/room");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51MqCXcAZTcl4qbBLWd9qJvnF9crkZ2aPqmB4AdXYSA6IgYTbNIUIprwCHKKvAfbkerFPJqnABVNWqYjTWIPZ5g0L008WCLBcqK"
);
const Booking = require("../models/booking");
const { Router } = require("express");

//// book room end point

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "ngn",
        receipt_email: token.email,
      },
      {
        idempotencykey: uuidv4(),
      }
    );

    if (payment) {
      // try {
      const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: Math.abs(dates[1].$d),
        todate: dates[0].$d,
        totalamount,

        totaldays,
        transaction: "1234",
      });

      const booking = await newbooking.save();

      const roomtemp = await Room.findOne({ _id: room._id });

      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: fromdate,
        todate: todate,
        userid: userid,
        status: booking.status,
      });
      await roomtemp.save();

      // res.send("Room Booked Sucessfully");
      // } catch (error) {
      //   return res.status(400).json({ error });
      // }
    }

    res.send("payment successful, your room is booked");
  } catch (error) {
    return res.status(400).json({ message: "error" });
  }
});

router.get("/getbookingbyuserid", async (req, res) => {
  // const userId = req.params.id;

  try {
    const bookings = await Booking.find({});
    res.send({ bookings });
  } catch (error) {
    return res.status(400).json({ message: "error" });
  }
});
// update

router.put("/updateiscancelled", async (req, res) => {
  try {
    const updatedisCancelled = await Booking.findOneAndUpdate({
      $set: { isCancelled: true },
    });

    res.status(200).json(updatedisCancelled);
  } catch (error) {
    res.status(500).json({ error: "Failed to update isCancelled" });
  }
});

/// UPDATE IS CANCELLED

router.post("/iscancelled", async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const bookingitem = await Booking.findByOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    await bookingitem.save();
    const room = await Room.findByOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    room.currentbookings = temp;
    await room.save();
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/getbookings", async (req, res) => {
  // const userid = req.body.userid;

  try {
    const bookings = await Booking.find({});
    res.send({ bookings });
  } catch (error) {
    return res.status(400).json({ message: "error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletePost = await deletePost.findById(req.params.id);

    if (deletePost) {
      await deletePost.remove();
      res.json({ message: "Booking has been deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

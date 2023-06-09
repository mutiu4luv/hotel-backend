const express = require("express");
const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    roomid: { type: String, required: true },
    userid: { type: String, required: true },
    fromdate: { type: String, required: true },
    todate: { type: String, required: true },
    totalamount: { type: Number, required: true },
    totaldays: { type: Number, required: true },
    transaction: { type: String, required: true },
    isCancelled: { type: Boolean, default: false },
    status: { type: String, default: "booked" },
  },
  {
    timestamps: true,
  }
);

const bookingmodel = mongoose.model("bookings", bookingSchema);

module.exports = bookingmodel;

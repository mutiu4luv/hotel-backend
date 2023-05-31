const express = require("express");

const router = express.Router();

const Room = require("../models/room");

/// GET ALL ROOMS

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send({ rooms });
    // return res.json({rooms})
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

/// post single room

// router.get("/getroombyid", async (req, res) => {
//   // const singleroom = await singleroom.findById(req.params.id);
//   res.json({ me: "yes" });

//   // if (singleroom) {
//   //   res.json({me: 'yes'});
//   //   // res.json({ jss1result: jss1result, hasError: false });
//   // } else {
//   //   res.status(404).json({ message: "Room not found" });
//   // }
// });

router.get("/getroombyid/:roomid", async (req, res) => {
  const roomid = req.params.roomid;

  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
    // return res.json({rooms})
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

/// CREATE NEW ROOM

///create new room
router.post(
  "/newroom",

  async (req, res) => {
    console.log(req.body);
    try {
      //create new room
      const newRoom = new Room({
        name: req.body.name,
        maxcount: req.body.maxcount,
        phonenumber: req.body.phonenumber,
        rentperday: req.body.rentperday,
        imageurls: req.body.imageurls,
        currentbookings: req.body.currentbookings,
        description: req.body.description,
        type: req.body.type,
      });
      // newRoom.save();

      const room = await newRoom.save();
      res.res.send({ message: "saved successfully", room: newRoom, sd: room });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post("/addrooms", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send("new room added successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteRoom = await Room.findById(req.params.id);

    if (deleteRoom) {
      await deleteRoom.delete();
      res.json({ message: "Room has been deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/deletes/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Room has been deleted" });
  } catch (error) {
    res.status(500).json("cannot delete");
  }
});

module.exports = router;

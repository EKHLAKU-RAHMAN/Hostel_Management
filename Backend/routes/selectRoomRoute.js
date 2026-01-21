const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const verifyWarden = require("../middleware/verifyWarden");


// GET ROOMS WITH ATTENDANCE STATUS (DATE WISE)
router.get("/select/rooms", verifyWarden, async (req, res) => {
  try {
    const { hostel, floor, date } = req.query;

    const rooms = await Room.find({ hostel, floor });

    const response = await Promise.all(
      rooms.map(async (room) => {
        const totalStudents = await Student.countDocuments({
          hostel,
          floor,
          room: room.roomNo
        });

        const markedCount = await Attendance.countDocuments({
          hostel,
          floor,
          room: room.roomNo,
          date // 🔥 DATE IS KEY
        });

        return {
          roomNo: room.roomNo,
          floor: room.floor,
          totalStudents,
          markedCount
        };
      })
    );

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const Room = require("../models/Room");
const verifyWarden = require("../middleware/verifyWarden");
const verifyAdmin = require("../middleware/verifyAdmin");

router.get(
  "/attendance-selection/hostels",
  verifyWarden,
  async (req, res) => {
    try {
      const hostels = await Room.distinct("hostel");
      res.json(hostels);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch hostels" });
    }
  }
);

/* =====================================================
   2️⃣ GET FLOORS BY HOSTEL
===================================================== */
router.get(
  "/attendance-selection/floors/:hostel",
  verifyWarden,
  async (req, res) => {
    try {
      const { hostel } = req.params;

      const floors = await Room.distinct("floor", { hostel });

      res.json(floors.sort((a, b) => a - b));
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch floors" });
    }
  }
);




module.exports = router;

const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const verifyWarden = require("../middleware/verifyWarden");

router.get("/warden/students-by-room", verifyWarden, async (req, res) => {
  try {
    const { hostel, floor, roomNo, date } = req.query;
    console.log("Request Query : ",req.query);

    // 1️⃣ Students find karo
    const students = await Student.find({
      hostel,
      floor,
      room: roomNo,
      // isActive: true
    }).select("studentName fatherName");
    console.log("Students Found ", students.length);
    console.log("Student Data", students);

    // 2️⃣ Attendance find karo (same date)
    const attendance = await Attendance.find({
      hostel,
      floor,
      roomNo,
      date
    });

    // 3️⃣ Map status
    const result = students.map((stu) => {
      const att = attendance.find(
        (a) => a.studentId.toString() === stu._id.toString()
      );

      return {
        _id: stu._id,
        studentName: stu.studentName,
        fatherName: stu.fatherName,
        status: att ? att.status : null
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load students" });
  }
});

module.exports = router;


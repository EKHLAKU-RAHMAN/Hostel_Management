
// const express = require("express");
// const router = express.Router();
// const Attendance = require("../models/Attendance");
// const Student = require("../models/Student");
// const verifyWarden = require("../middleware/verifyWarden");
// const sendSMS = require("../utils/absentSMS");

// router.post("/attendance/mark", verifyWarden, async (req, res) => {
//   try {
//     const { studentId, date, status } = req.body;

//     if (!studentId || !date || !status) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const student = await Student.findById(studentId);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // ✅ UPSERT ATTENDANCE
//     const attendance = await Attendance.findOneAndUpdate(
//       { studentId, date },
//       {
//         studentId,
//         date,
//         status,
//         hostel: student.hostel,
//         floor: student.floor,
//         room: student.room,
//       },
//       { upsert: true, new: true }
//     );

// if (status === "Absent") {
//   console.log("🚨 ABSENT DETECTED");

// const smsText = `Dear Parent,
// This is to inform you that your ward ${student.studentName} (Room ${student.room}, ${student.hostel}) was absent from the hostel on ${date}.

// – Shri Ram College Hostel Muzaffarnagar`;


//   await sendSMS({
//     mobile: student.fatherMobile,
//     message: smsText
//   });
// }

//     res.json({
//       success: true,
//       status: attendance.status,
//     });

//   } catch (error) {
//     console.error("Attendance Update Error 👉", error);
//     res.status(500).json({ message: "Attendance update failed" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Student = require("../models/Student");
const verifyWarden = require("../middleware/verifyWarden");
const sendSMS = require("../utils/absentSMS");

router.post("/attendance/mark", verifyWarden, async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🔥 find old attendance (for SMS logic)
    const oldAttendance = await Attendance.findOne({ studentId, date });

    // ✅ UPSERT (default Present handled automatically)
    const attendance = await Attendance.findOneAndUpdate(
      { studentId, date },
      {
        studentId,
        date,
        status,
        hostel: student.hostel,
        floor: student.floor,
        room: student.room,
      },
      { upsert: true, new: true }
    );

    // 📩 SMS ONLY IF Present ➜ Absent
    if (
      status === "Absent" &&
      (!oldAttendance || oldAttendance.status !== "Absent")
    ) {
      console.log("🚨 ABSENT SMS SENT");

const smsText = `Dear Parent, aapko suchit kiya jata hai ki aapke child ${student.studentName}, Room No. ${student.room} (${student.hostel}), ${date} ko bina suchna ke hostel se anupasthit paye gaye.  
– Shri Ram College Hostel, Muzaffarnagar`;


      await sendSMS({
        mobile: student.fatherMobile,
        message: smsText,
      });
    }

    res.json({
      success: true,
      status: attendance.status,
    });

  } catch (error) {
    console.error("Attendance Update Error 👉", error);
    res.status(500).json({ message: "Attendance update failed" });
  }
});

module.exports = router;


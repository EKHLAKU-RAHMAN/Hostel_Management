
const express = require("express");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/student/login", async (req, res) => {
  const { studentId, password } = req.body;

  if (!studentId || !password) {
    return res.status(400).json({ message: "Student ID and password are required" });
  }

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "No student found with this ID" });
    }

    
    // const isMatch = await bcrypt.compare(password, student.password);
    // console.log(isMatch);
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

        // 🔍 DEBUG LOGS (YAHAN PASTE KARO)
    console.log("INPUT PASSWORD:", password);
    console.log("DB PASSWORD:", student.password);
    console.log("IS HASHED:", student.password.startsWith("$2"));

    let isMatch = false;

if (student.password.startsWith("$2")) {
  // hashed password
  isMatch = await bcrypt.compare(password, student.password);
} else {
  // old plain password
  isMatch = password === student.password;
}

if (!isMatch) {
  return res.status(401).json({ message: "Invalid credentials" });
}


    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: student._id, role: "student", studentId: student.studentId },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" } // 1 hour expiry
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      student,
      token, // ✅ send token to frontend
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

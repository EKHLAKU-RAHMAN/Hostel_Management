
const Student = require("../models/Student.js");
const upload = require("../routes/Upload"); 
const express = require("express");
const Room = require("../models/Room.js");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail.js");

const router = express.Router();



// Add new student
module.exports.newStudent =  async (req, res) => {
  try {
    const {
      studentName,
      fatherName,
      motherName,
      studentMobile,
      fatherMobile,
      email,
      studentId,
      course,
      session,
      year,
      room,
      hostel,
      floor,
      password,
    } = req.body;

    // room validation
    if (!room) {
      return res.status(400).json({ message: "Room is required" });
    }

    // check room capacity
    const foundRoom = await Room.findOne({ roomNo: room });
    if (!foundRoom) {
      return res.status(400).json({ message: "Room not found" });
    }
    // 2️⃣ Count REAL students in room
      const occupiedCount = await Student.countDocuments({
        room: foundRoom._id,
        isActive: true
      });

    if (occupiedCount >= foundRoom.capacity) {
      return res.status(400).json({ message: "Room is already full" });
    }

      // ✅ Hash password (use default if not provided)
      const hashedPassword = await bcrypt.hash(password || "student@123", 10);

    const newStudent = new Student({
      studentName,
      fatherName,
      motherName,
      studentMobile,
      fatherMobile,
      email,
      studentId,
      course,
      session,
      year,
      room,
      hostel,
      floor,
      password: hashedPassword, // ✅ store hashed password
      photo: req.file ? req.file.path : null,

    });

    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully", student: newStudent });

    // increment occupied count in room
    foundRoom.occupied += 1;
    await foundRoom.save();

sendEmail({
  to: email,
  subject: "Hostel Registration Successful",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Dear ${studentName},</h2>

      <p>
        Congratulations! 🎉  
        We are pleased to inform you that your 
        <strong>hostel registration has been successfully completed</strong>.
      </p>

      <hr />

      <h3>🏠 Hostel & Admission Details</h3>

      <p>
        <strong>Student Name:</strong> ${studentName}<br/>
        <strong>Student ID:</strong> ${studentId}<br/>
        <strong>Default Password:</strong> <b>student@123</b><br/>
        <strong>Course:</strong> ${course}<br/>
        <strong>Session:</strong> ${session}
      </p>

      <p>
        <strong>Accommodation Details:</strong><br/>
        ${hostel} – Floor: ${floor} – Room No. <b>${room}</b>
      </p>

      <hr />

      <h3>🔐 Student Login</h3>

      <p>
        You can access your hostel account using the link below:
      </p>

      <p style="text-align: center; margin: 20px 0;">
        <a 
          href="${process.env.STUDENT_PORTAL_URL}" 
          style="
            background: #0d6efd;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
          "
        >
          Login to Student Portal
        </a>
      </p>

      <p style="font-size: 13px; color: #555;">
        If the button doesn’t work, copy and paste this link into your browser:<br/>
        <a href="${process.env.STUDENT_PORTAL_URL}">
          ${process.env.STUDENT_PORTAL_URL}
        </a>
      </p>

      <hr />

      <p>
        If you face any issues or require corrections in your details, please contact the hostel administration.
      </p>

      <p>
        We wish you a comfortable and successful stay.
      </p>

      <br/>
      <p>
        Regards,<br/>
        <strong>Shri Ram College Hostel Muzaffarnagar</strong>
      </p>
    </div>
  `
});


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get Students
module.exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getStudentById
module.exports.getStudentById =  async(req, res)=>{
  const {id} = req.params;
  try{
    const StudentDetails = await Student.findById(id);
    res.send(StudentDetails);
  } catch(error){
    res.status(500).json({ error: error.message });
  }
};



// PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    // const { room, email, studentName } = req.body;
      const {
      studentName,
      email,
      course,
      session,
      room,
      hostel,
      floor,
    } = req.body;

    // Old student fetch
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Agar room change ho raha hai to hi capacity check karna hai
    if (room && room !== student.room) {
      const foundRoom = await Room.findOne({ roomNo: room });
      if (!foundRoom) {
        return res.status(404).json({ message: "Room not found" });
      }

    //   // Room capacity check with actual students count
    //   const studentCount = await Student.countDocuments({ room });
    //   if (studentCount >= foundRoom.capacity) {
    //     return res.status(400).json({ message: "Room is already full" });
    //   }

        // 2️⃣ Count REAL students in room
        const occupiedCount = await Student.countDocuments({
        room: foundRoom._id,
        isActive: true
      });

    if (occupiedCount >= foundRoom.capacity) {
      return res.status(400).json({ message: "Room is already full" });
    }
  }

    // Update data
    Object.assign(student, req.body);
    if (req.file) {
      student.photo = req.file.path;
    }

    await student.save();
    res.json({ message: "Student updated successfully", student });

    // send email after update successfull
  sendEmail({
  to: email,
  subject: "Hostel Registration Successful",
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Dear ${studentName},</h2>

      <p>
        Congratulations! 🎉
        Your hostel information has been successfully updated.  
        We are pleased to inform you that your <strong>hostel registration has been successfully completed</strong>.
      </p>

      <hr />

      <h3>🏠 Hostel & Admission Details</h3>

      <p>
        <strong>Student Name:</strong> ${studentName}<br/>
        <strong>Student ID:</strong> ${studentId}<br/>
        <strong>Course:</strong> ${course}<br/>
        <strong>Session:</strong> ${session}
      </p>

      <p>
        <strong>Accommodation Details:</strong><br/>
        ${hostel} – Floor: ${floor} – Room No. <b>${room}</b>
      </p>

      <hr />

      <p>
        🔐 <strong>Login Information</strong><br/>
        Your account has been created successfully.  
        Please use your registered email and the password you set during registration to log in.
      </p>

      <p>
        If you face any issues or require corrections in your details, please contact the hostel warden or administration office.
      </p>

      <p>
        We wish you a comfortable and successful stay.
      </p>

      <br/>
      <p>
        Regards,<br/>
        <strong>Shri Ram College Hostel Muzaffarnagar</strong>
      </p>
    </div>
  `
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Destroy Student
module.exports.deleteStudent  = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(id);

    res.json({ message: "Student deleted successfully" });
    console.log("student delted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};













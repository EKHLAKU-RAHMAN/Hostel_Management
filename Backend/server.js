if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();
// const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRouter = require("./routes/studentRoute");
const { findById } = require("./models/Student");
const Student = require("./models/Student");
const multer = require("multer");
const path = require("path");
const verifyAdmin = require("./middleware/verifyAdmin");
const roomRouter = require("./routes/roomRoute");
const wardenRouter = require("./routes/wardenRoute");
const StudenForWarden = require("./routes/studentForWarden");
const Attendance = require("./routes/AttendenceRoute");
const wardenprofileRouter = require("./routes/wardenProfile");
const CheckAttendance = require("./routes/checkAttendance");
const AddWarden = require("./routes/addWarden");
const NotificationRoute = require("./routes/notificationRoute");
const GalleryRoute = require("./routes/GalleryRoute");
const StudentLoginRouter = require("./routes/studentLoginRoute");
const ComplaintRouter = require("./routes/complaintRoute");
const WardenProfileRouter = require("./routes/wardenProfile");
const adminLoginRoute = require("./routes/adminLogin");
const StudentProfileRouter = require("./routes/studentProfileRouter");
const AdminDashBoard = require("./routes/adminDashBoard");
const WardenLoginRouter = require("./routes/wardenLoginRoute");
const ContactRoute = require("./routes/contactRoute");
const { env } = require("process");
const importExcel = require("./routes/importStudent");
const selectHostelRoute = require("./routes/selectHostelRoute");
const selectRoomRoute = require("./routes/selectRoomRoute");
const selectStudent = require("./routes/selectStudentRoute");
const markAttendance = require("./routes/markAttendance");


const allowedOrigins = [
  "http://localhost:5173",
  "https://hostel-management-nu.vercel.app",
  "https://hostel-management-git-main-ekhlaku-rahmans-projects.vercel.app"
];

app.use(cors());
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server & Render health checks
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // ❌ ERROR THROW MAT KARO
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());

const dbUrl = process.env.MONGO_URI;
const DB_URL = process.env.DB_URL;



main()
.then(()=>{
    console.log("connect to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);
}


//Api
app.get("/", (req, res)=>{
  res.send("testing");
});
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api",studentRouter);
app.use("/", studentRouter);
app.use("/", roomRouter);
// app.use("/", roomRouter);
app.use("/api", roomRouter); 
// app.use("/api",wardenRouter);
app.use("/api", StudenForWarden);
// app.use("/api", Attendance);
// app.use("/api/warden", wardenRouter);
app.use("/api", Attendance);
app.use("/api", wardenRouter);
app.use("/api", CheckAttendance);
app.use("/api", AddWarden);
app.use("/api", NotificationRoute);
app.use("/api", GalleryRoute);
app.use("/api", StudentLoginRouter);
app.use("/api", ComplaintRouter);
app.use("/api", WardenProfileRouter);
app.use("/api", adminLoginRoute);
app.use("/api", StudentProfileRouter);
app.use("/api", wardenprofileRouter);
app.use("/api", WardenLoginRouter);
app.use("/api", AdminDashBoard);
app.use("/api", ContactRoute);
app.use("/api", importExcel);
app.use("/api", selectHostelRoute);
app.use("/api", selectRoomRoute);
app.use("/api", selectStudent);
app.use("/api",markAttendance);

app.use("/all", verifyAdmin, async (req, res) => {
  const data = await SomeModel.find();
  res.json(data);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`server is listening on ${PORT}`);
});
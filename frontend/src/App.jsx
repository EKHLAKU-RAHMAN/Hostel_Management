
// import React from "react";

// // import "react-toastify/dist/ReactToastify.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import StudentDashboard from "./pages/StudentDashboard";
// import StudentAuth from "./pages/StudentAuth";
// import WardenAuth from "./pages/WardenAuth";
// import WardenDashboard from "./WardenPages/WardenDashboard";
// import AdminAuth from "./pages/AdminAuth";
// import AdminDashboard from "./pages/AdminDashboard";
// import ManageStudents from "./AdminPages/ManageStudent";
// import StudentDetail from "./AdminPages/StudentDetails";
// import StudentRegForm from "./AdminPages/StudentRegForm";
// import StudentEdit from "./AdminPages/StudentEdit";
// import ManageComplaints from "./AdminPages/ManageComplaint";
// import ManageRoom from "./AdminPages/ManageRoom";
// import Attendence from "./WardenPages/SelectAttendence";
// import StudentList from "./WardenPages/StudentList";
// import StudentDtl from "./WardenPages/StudentDtl";
// import RoomDetails from "./WardenPages/RoomDetails";
// import AttendanceHistory from "./WardenPages/AttendanceHistory";
// import Report from "./WardenPages/Report";
// import WardenProfile from "./WardenPages/WardenProfile";
// import StudentLayout from "./StudentComponent/StudentLayout";
// import StudentHome from "./StudentPages/StudentHome";
// import CheckAttendance from "./StudentPages/CheckAttendance";
// import StudentProfile from "./StudentPages/StudentProfile";
// import ManageWarden  from "./AdminPages/ManageWarden";
// import ManageAttendance from "./AdminPages/ManageAttendance";
// import NotificationUpload  from "./AdminPages/ManageNotification";
// import Gallary from "./AdminPages/Gallary";
// import Complaints from "./StudentPages/Complaints";
// import WardenComplaint from "./WardenPages/Complaints";
// import Notification from "./StudentPages/Notification";
// import GalleryforStud from "./StudentPages/GalleryForStu";
// import HostelDetails from "./StudentPages/HostelDetails";
// import About from "./pages/About";
// import AddWarden from "./AdminPages/AddWarden";
// import Contact from "./pages/Contact";
// import WardenChangePassword from "./WardenPages/ChangeWardenPass";
// import EditStudentPass from "./StudentPages/StudentEditPass";
// import HostelGallery from "./pages/HostelGallery";
// import ManageContact from "./AdminPages/ManageContact";
// import ProtectedRoute from "./pages/ProtectedRoute";
// import SelectAttendance from "./WardenPages/SelectAttendence";
// import SelectRoom from "./WardenPages/SelectRoom"
// import MarkAttendence from "./WardenPages/MarkAttendence";

// const admin = JSON.parse(localStorage.getItem("admin"));

// function App() {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   return (
// <Router>
//       <Routes>
//         {/* Home Route */}
//         {/* <ToastContainer position="top-right" autoClose={3000} /> */}
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/hostel/gallery" element={<HostelGallery />} />
//       </Routes>

//       <Routes>
//         {/* Auth Route */}
//         <Route path="/login/student" element={<StudentAuth/>} />
//         <Route path="/login/warden" element={<WardenAuth/>} />
//         <Route path="/login/admin" element={<AdminAuth/>} />
//       </Routes>

//       <Routes>
//         {/* Dashboard */}
//         <Route path="/student/dashboard" element={
//           <ProtectedRoute role="student"><StudentHome /></ProtectedRoute> } />
//         <Route path="/warden/dashboard" element={
//           <ProtectedRoute role="warden"><WardenDashboard /></ProtectedRoute>} />
//         <Route path="/admin/dashboard" element={
//           <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
//       </Routes>

//         <Routes>
//           {/* Manage Admin */}
//           <Route path="/student/register" element={<ProtectedRoute role="admin"><StudentRegForm /></ProtectedRoute>} />
//           <Route path="/admin/students" element={<ProtectedRoute role="admin"><ManageStudents /></ProtectedRoute>}/>
//           <Route path="/students/:id" element={<ProtectedRoute role="admin"><StudentDetail /></ProtectedRoute>}/>
//           <Route path="/students/edit/:id" element={<ProtectedRoute role="admin"><StudentEdit /></ProtectedRoute>} />
//           <Route path="/admin/complaints" element={<ProtectedRoute role="admin"><ManageComplaints /></ProtectedRoute>} />
//           <Route path="/admin/rooms" element={<ProtectedRoute role="admin"><ManageRoom /></ProtectedRoute>} />
//           <Route path="/admin/attendance" element={<ProtectedRoute role="admin"><ManageAttendance /></ProtectedRoute>}/>
//           <Route path="/admin/warden" element={<ProtectedRoute role="admin"><ManageWarden /></ProtectedRoute>} />
//           <Route path="/admin/notification" element={<ProtectedRoute role="admin"><NotificationUpload /></ProtectedRoute>} />
//           <Route path="/admin/gallary" element={<ProtectedRoute role="admin"><Gallary /></ProtectedRoute>} />
//           <Route path="/admin/add-warden" element={<ProtectedRoute role="admin"><AddWarden /></ProtectedRoute>} />
//           <Route path="/admin/contact" element={<ProtectedRoute role="admin"><ManageContact /></ProtectedRoute>} />
//         </Routes>

//         <Routes>
//            {/* Warden */}
//           <Route path="/warden/attendance" element={<ProtectedRoute role="warden"><Attendence /></ProtectedRoute>} />
//           <Route path="/warden/students" element={<ProtectedRoute role="warden"><StudentList /></ProtectedRoute>} />
//           <Route path="/warden/students/:id" element={<ProtectedRoute role="warden"><StudentDtl /></ProtectedRoute>} />
//           <Route path="/warden/rooms" element={<ProtectedRoute role="warden"><RoomDetails /></ProtectedRoute>} />
//           <Route path="/warden/selectAttendance" element={<ProtectedRoute role="warden"><SelectAttendance /></ProtectedRoute>} />
//           <Route path="/warden/selectRoom" element={<ProtectedRoute role="warden"><SelectRoom /></ProtectedRoute>} />
//           <Route path="/warden/markAttendence" element={<ProtectedRoute role="warden"><MarkAttendence /></ProtectedRoute>} />
//           <Route path="/warden/attendanceHistory" element={<ProtectedRoute role="warden"><AttendanceHistory /></ProtectedRoute>} />
//           <Route path="/warden/report" element={<ProtectedRoute role="warden"><Report /></ProtectedRoute>} />
//           <Route path="/warden/profile" element={<ProtectedRoute role="warden"><WardenProfile /></ProtectedRoute>} />
//           <Route path="/warden/change-password" element={<ProtectedRoute role="warden"><WardenChangePassword /></ProtectedRoute>} />
//         </Routes>

//         <Routes>
//           {/* Student */}
//           <Route path="/student/home" element={<ProtectedRoute role="student"><StudentHome /></ProtectedRoute>} />
//           <Route path="/student/attendance" element={<ProtectedRoute role="student"><CheckAttendance /></ProtectedRoute>} />
//           <Route path="/student/profile" element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>} />
//           <Route path="/student/complaints" element={<ProtectedRoute role="student"><Complaints /></ProtectedRoute>} />
//           <Route path="/student/notifications" element={<ProtectedRoute role="student"><Notification /></ProtectedRoute>} />
//           <Route path="/student/gallery" element={<ProtectedRoute role="student"><GalleryforStud /></ProtectedRoute>} />
//           <Route path="/student/hostel-info" element={<ProtectedRoute role="student"><HostelDetails /></ProtectedRoute>} />
//           <Route path="/student/edit-password" element={<ProtectedRoute role="student"><EditStudentPass /></ProtectedRoute>} />
//         </Routes>
// </Router>
//   );
// }

// export default App;





import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const HostelGallery = React.lazy(() => import("./pages/HostelGallery"));

// Student
const StudentHome = React.lazy(() => import("./StudentPages/StudentHome"));
const CheckAttendance = React.lazy(() => import("./StudentPages/CheckAttendance"));
const StudentProfile = React.lazy(() => import("./StudentPages/StudentProfile"));
const Complaints = React.lazy(() => import("./StudentPages/Complaints"));
const Notification = React.lazy(() => import("./StudentPages/Notification"));
const GalleryforStud = React.lazy(() => import("./StudentPages/GalleryForStu"));
const HostelDetails = React.lazy(() => import("./StudentPages/HostelDetails"));
const EditStudentPass = React.lazy(() => import("./StudentPages/StudentEditPass"));

// Warden
const WardenDashboard = React.lazy(() => import("./WardenPages/WardenDashboard"));
const Attendence = React.lazy(() => import("./WardenPages/SelectAttendence"));
const StudentList = React.lazy(() => import("./WardenPages/StudentList"));
const StudentDtl = React.lazy(() => import("./WardenPages/StudentDtl"));
const RoomDetails = React.lazy(() => import("./WardenPages/RoomDetails"));
const AttendanceHistory = React.lazy(() => import("./WardenPages/AttendanceHistory"));
const Report = React.lazy(() => import("./WardenPages/Report"));
const WardenProfile = React.lazy(() => import("./WardenPages/WardenProfile"));
const SelectAttendance = React.lazy(() => import("./WardenPages/SelectAttendence"));
const SelectRoom = React.lazy(() => import("./WardenPages/SelectRoom"));
const MarkAttendence = React.lazy(() => import("./WardenPages/MarkAttendence"));
const WardenChangePassword = React.lazy(() => import("./WardenPages/ChangeWardenPass"));

// Admin
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const StudentRegForm = React.lazy(() => import("./AdminPages/StudentRegForm"));
const ManageStudents = React.lazy(() => import("./AdminPages/ManageStudent"));
const StudentDetail = React.lazy(() => import("./AdminPages/StudentDetails"));
const StudentEdit = React.lazy(() => import("./AdminPages/StudentEdit"));
const ManageComplaints = React.lazy(() => import("./AdminPages/ManageComplaint"));
const ManageRoom = React.lazy(() => import("./AdminPages/ManageRoom"));
const ManageAttendance = React.lazy(() => import("./AdminPages/ManageAttendance"));
const ManageWarden = React.lazy(() => import("./AdminPages/ManageWarden"));
const NotificationUpload = React.lazy(() => import("./AdminPages/ManageNotification"));
const Gallary = React.lazy(() => import("./AdminPages/Gallary"));
const AddWarden = React.lazy(() => import("./AdminPages/AddWarden"));
const ManageContact = React.lazy(() => import("./AdminPages/ManageContact"));

// Auth
const StudentAuth = React.lazy(() => import("./pages/StudentAuth"));
const WardenAuth = React.lazy(() => import("./pages/WardenAuth"));
const AdminAuth = React.lazy(() => import("./pages/AdminAuth"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Home & Info */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hostel/gallery" element={<HostelGallery />} />

          {/* Auth */}
          <Route path="/login/student" element={<StudentAuth />} />
          <Route path="/login/warden" element={<WardenAuth />} />
          <Route path="/login/admin" element={<AdminAuth />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentHome />} />
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/student/attendance" element={<CheckAttendance />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/complaints" element={<Complaints />} />
          <Route path="/student/notifications" element={<Notification />} />
          <Route path="/student/gallery" element={<GalleryforStud />} />
          <Route path="/student/hostel-info" element={<HostelDetails />} />
          <Route path="/student/edit-password" element={<EditStudentPass />} />

          {/* Warden Routes */}
          <Route path="/warden/dashboard" element={<WardenDashboard />} />
          <Route path="/warden/attendance" element={<Attendence />} />
          <Route path="/warden/students" element={<StudentList />} />
          <Route path="/warden/students/:id" element={<StudentDtl />} />
          <Route path="/warden/rooms" element={<RoomDetails />} />
          <Route path="/warden/selectAttendance" element={<SelectAttendance />} />
          <Route path="/warden/selectRoom" element={<SelectRoom />} />
          <Route path="/warden/markAttendence" element={<MarkAttendence />} />
          <Route path="/warden/attendanceHistory" element={<AttendanceHistory />} />
          <Route path="/warden/report" element={<Report />} />
          <Route path="/warden/profile" element={<WardenProfile />} />
          <Route path="/warden/change-password" element={<WardenChangePassword />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/student/register" element={<StudentRegForm />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/students/edit/:id" element={<StudentEdit />} />
          <Route path="/admin/complaints" element={<ManageComplaints />} />
          <Route path="/admin/rooms" element={<ManageRoom />} />
          <Route path="/admin/attendance" element={<ManageAttendance />} />
          <Route path="/admin/warden" element={<ManageWarden />} />
          <Route path="/admin/notification" element={<NotificationUpload />} />
          <Route path="/admin/gallary" element={<Gallary />} />
          <Route path="/admin/add-warden" element={<AddWarden />} />
          <Route path="/admin/contact" element={<ManageContact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

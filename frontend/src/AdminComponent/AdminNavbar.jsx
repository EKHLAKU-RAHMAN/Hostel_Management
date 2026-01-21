
import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar className="admin-navbar" expand="lg" sticky="top">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/admin/dashboard" className="admin-brand">
          <span className="brand-icon">■</span>
          <span className="brand-text">Hostel Admin</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar-nav" />

        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="ms-auto nav-items">
            <Nav.Link 
              as={Link} 
              to="/admin/students"
              className={`nav-item ${isActive('/admin/students') ? 'active' : ''}`}
            >
              Get Admissions
            </Nav.Link>

            <Nav.Link 
              as={Link} 
              to="/admin/complaints"
              className={`nav-item ${isActive('/admin/complaints') ? 'active' : ''}`}
            >
              Complaints
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/rooms"
              className={`nav-item ${isActive('/admin/rooms') ? 'active' : ''}`}
            >
              Rooms
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/attendance"
              className={`nav-item ${isActive('/admin/attendance') ? 'active' : ''}`}
            >
              Attendance
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/admin/warden"
              className={`nav-item ${isActive('/admin/warden') ? 'active' : ''}`}
            >
              Wardens
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/notification"
              className={`nav-item ${isActive('/admin/mess') ? 'active' : ''}`}
            >
              Notifications
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/gallary"
              className={`nav-item ${isActive('/admin/gallary') ? 'active' : ''}`}
            >
              Gallery
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/contact"
              className={`nav-item ${isActive('/admin/contact') ? 'active' : ''}`}
            >
              Contacts
            </Nav.Link>
            
            <Nav.Link 
              onClick={handleLogout}
              className="nav-item nav-logout"
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;





// import React from "react";
// import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import "./AdminNavbar.css";

// const AdminNavbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     sessionStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   const isActive = (path) => location.pathname.startsWith(path);

//   return (
//     <Navbar className="admin-navbar" expand="lg" sticky="top">
//       <Container fluid className="px-4">
//         <Navbar.Brand as={Link} to="/admin/dashboard" className="admin-brand">
//           <span className="brand-icon">■</span>
//           <span className="brand-text">Hostel Admin</span>
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="admin-navbar-nav" />
//         <Navbar.Collapse id="admin-navbar-nav">
//           <Nav className="ms-auto nav-items">

//             {/* GET ADMISSIONS DROPDOWN */}
//             <NavDropdown
//               title="Get Admissions"
//               id="admission-dropdown"
//               className={`nav-item ${isActive("/admin/students") ? "active" : ""}`}
//             >

//               <NavDropdown.Item
//                 as={Link}
//                 to="/admin/students?hostel=hostel1"
//               >
//                 Hostel A
//               </NavDropdown.Item>

//               <NavDropdown.Item
//                 as={Link}
//                 to="/admin/students?hostel=hostel2"
//               >
//                 Hostel B
//               </NavDropdown.Item>

//               <NavDropdown.Item
//                 as={Link}
//                 to="/admin/students?hostel=hostel3"
//               >
//                 Hostel C
//               </NavDropdown.Item>

//               <NavDropdown.Item
//                 as={Link}
//                 to="/admin/students?hostel=hostel4"
//               >
//                 Hostel D
//               </NavDropdown.Item>
//             </NavDropdown>

//             {/* OTHER NAV LINKS */}
//             <Nav.Link
//               as={Link}
//               to="/admin/complaints"
//               className={`nav-item ${isActive("/admin/complaints") ? "active" : ""}`}
//             >
//               Complaints
//             </Nav.Link>

//             <Nav.Link
//               as={Link}
//               to="/admin/rooms"
//               className={`nav-item ${isActive("/admin/rooms") ? "active" : ""}`}
//             >
//               Rooms
//             </Nav.Link>

//             <Nav.Link
//               as={Link}
//               to="/admin/attendance"
//               className={`nav-item ${isActive("/admin/attendance") ? "active" : ""}`}
//             >
//               Attendance
//             </Nav.Link>

//             <Nav.Link
//               as={Link}
//               to="/admin/warden"
//               className={`nav-item ${isActive("/admin/warden") ? "active" : ""}`}
//             >
//               Wardens
//             </Nav.Link>

//             <Nav.Link
//               as={Link}
//               to="/admin/mess"
//               className={`nav-item ${isActive("/admin/mess") ? "active" : ""}`}
//             >
//               Notifications
//             </Nav.Link>

//             <Nav.Link
//               as={Link}
//               to="/admin/gallary"
//               className={`nav-item ${isActive("/admin/gallary") ? "active" : ""}`}
//             >
//               Gallery
//             </Nav.Link>

//             <Nav.Link
//               as={Link}
//               to="/admin/contact"
//               className={`nav-item ${isActive("/admin/contact") ? "active" : ""}`}
//             >
//               Contacts
//             </Nav.Link>

//             <Nav.Link
//               onClick={handleLogout}
//               className="nav-item nav-logout"
//             >
//               Logout
//             </Nav.Link>

//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default AdminNavbar;


// src/components/Student/StudentComponent/StudentLayout.js
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function StudentLayout({ children }) {
   const handleLogout = () => {
    // example: token हटाना
    localStorage.removeItem("studentToken");
    sessionStorage.removeItem("studentToken");

    // redirect to login
    navigate("/");
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>Student Dashboard</Navbar.Brand>
          
          {/* 👇 Ye line hamburger button add karegi */}
          <Navbar.Toggle aria-controls="student-navbar-nav" />
          
          {/* 👇 Ye line mobile collapse ko handle karegi */}
          <Navbar.Collapse id="student-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/student/home">Home</Nav.Link>
              <Nav.Link href="/student/attendance">Attendance</Nav.Link>
              <Nav.Link href="/student/complaints">Complaints</Nav.Link>
              <Nav.Link href="/student/gallery">Gallery</Nav.Link>
              <Nav.Link href="/student/notifications">Notification</Nav.Link>
              <Nav.Link href="/student/profile">Profile</Nav.Link>
              <Nav.Link href="/" style={{ cursor: "pointer", color: "red" }} onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      <Container fluid className="flex-grow-1 p-3">
        {children}
      </Container>

      {/* Footer */}
      <footer
        className="bg-dark text-white text-center py-3 mt-auto"
        style={{ marginTop: "auto" }}
      >
        <Container>
          <p className="mb-1">
            © {new Date().getFullYear()} Student Hostel Portal. All Rights Reserved.
          </p>
          <small>
            Developed By ❤️ Mohd Rahman 
          </small>
        </Container>
      </footer>
    </div>
  );
}



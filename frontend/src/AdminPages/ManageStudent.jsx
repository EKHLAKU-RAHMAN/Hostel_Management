
// import React, { useState, useEffect } from "react";
// import { Table, Button, Form, Row, Col } from "react-bootstrap";
// import AdminLayout from "../AdminComponent/AdminLayout";
// import { useNavigate } from "react-router-dom";

// const ManageStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [searchName, setSearchName] = useState("");
//   const [searchYear, setSearchYear] = useState("");
//   const [searchHostel, setSearchHostel] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/admin/students`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch students");
//         return res.json();
//       })
//       .then((data) => setStudents(data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Filtered students based on name and year
//   const filteredStudents = students.filter((s) => {
//     const matchesName =
//       searchName === "" ||
//       s.studentName?.toLowerCase().includes(searchName.toLowerCase());

//     const matchesYear =
//       searchYear === "" ||
//       (s.year && s.year.toLowerCase() === searchYear.toLowerCase());

//       const matchHostel = 
//       searchHostel === "" ||
//       (s.hostel && s.hostel.toLowerCase() === searchHostel.toLowerCase());

//     return matchesName && matchesYear && matchHostel;
//   });

//   // ✅ Export CSV function
//   const exportToCSV = () => {
//     if (!filteredStudents.length) return alert("No students to export");

//     const headers = ["Room", "Name", "Father's Name", "Course", "Year"];
//     const rows = filteredStudents.map((s) => [
//       s.room,
//       s.studentName,
//       s.fatherName,
//       s.course,
//       s.year,
//     ]);

//     let csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((e) => e.join(",")).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "students.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };


// const fetchStudents = async () => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/students`);
//     const data = await res.json();
//     setStudents(data);
//   } catch (err) {
//     throw err;
//     console.error("Fetch students error:", err);
//   }
// };

// useEffect(() => {
//   fetchStudents();
// }, []);

// const handleImportExcel = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/import`, {
//       method: "POST",
//       body: formData,
//     });

//     if (!res.ok) throw new Error("Import failed");

//     alert("Students imported successfully");

//     try {
//       await fetchStudents();
//     } catch (e) {
//       alert("Imported but failed to refresh list");
//     }

//   } catch (err) {
//     console.error("❌ Import error:", err);
//     alert("Error importing students");
//   }
// };


//   return (
//     <AdminLayout>
//       <h3 className="mb-4">👥 Manage Students</h3>

//       {/* Filters + Add Button + Export CSV */}
//       <Row className="align-items-center mb-3">
//         <Col xs="auto">
//           <Button
//             variant="primary"
//             onClick={() => navigate(`/student/register`)}
//             style={{ height: "38px" }}
//           >
//             + Add Student
//           </Button>
//         </Col>

//         <Col xs="auto">
//           <Button variant="success" onClick={exportToCSV} style={{ height: "38px" }}>
//             Export to CSV
//           </Button>
//         </Col>

//         <Col xs="auto">
//         <Button
//         variant="secondary"
//         onClick={() => document.getElementById("importExcel").click()}
//         style={{ height: "38px" }}
//       >
//       Import Excel
//     </Button>

//   <input
//     type="file"
//     id="importExcel"
//     accept=".xlsx,.csv"
//     hidden
//     onChange={handleImportExcel}
//   />
// </Col>


//         <Col xs="auto">
//           <Form.Control
//             type="text"
//             placeholder="🔍 Search by Name"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//             style={{ minWidth: "200px" }}
//           />
//         </Col>

//         <Col xs="auto">
//           <Form.Select
//             value={searchYear}
//             onChange={(e) => setSearchYear(e.target.value)}
//             style={{ minWidth: "140px" }}
//           >
//             <option value="">All Years</option>
//             <option value="1st">1st</option>
//             <option value="2nd">2nd</option>
//             <option value="3rd">3rd</option>
//             <option value="4th">4th</option>
//           </Form.Select>
//         </Col>

        
//         <Col xs="auto">
//           <Form.Select
//             value={searchHostel}
//             onChange={(e) => setSearchHostel(e.target.value)}
//             style={{ minWidth: "140px" }}
//           >
//             <option value="">All Hostel</option>
//             <option value="Hostel A">Hostel A</option>
//             <option value="Hostel B">Hostel B</option>
//             <option value="Hostel C">Hostel C</option>
//             <option value="Hostel D">Hostel D</option>
//           </Form.Select>
//         </Col>
//       </Row>

//       {/* Student Table */}
//       <Table bordered hover responsive>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Room</th>
//             <th>Name</th>
//             <th>Father's Name</th>
//             <th>Course</th>
//             <th>Year</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.length > 0 ? (
//             filteredStudents.map((s, i) => (
//               <tr key={s._id || i}>
//                 <td>{i + 1}</td>
//                 <td>{s.room}</td>
//                 <td>{s.studentName}</td>
//                 <td>{s.fatherName}</td>
//                 <td>{s.course}</td>
//                 <td>{s.year}</td>
//                 <td>
//                   <Button
//                     size="sm"
//                     variant="info"
//                     onClick={() => navigate(`/students/${s._id}`)}
//                   >
//                     View
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center text-muted">
//                 No students found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </AdminLayout>
//   );
// };

// export default ManageStudents;


import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../AdminComponent/AdminLayout";

const API_URL = import.meta.env.VITE_API_URL;

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchHostel, setSearchHostel] = useState("");
  const navigate = useNavigate();

  /* ================= FETCH STUDENTS ================= */
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/students`);
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data || []);
    } catch (err) {
      console.error("❌ Fetch students error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredStudents = students.filter((s) => {
    const nameMatch =
      searchName === "" ||
      s.studentName?.toLowerCase().includes(searchName.toLowerCase());

    const yearMatch =
      searchYear === "" ||
      s.year?.toLowerCase() === searchYear.toLowerCase();

    const hostelMatch =
      searchHostel === "" ||
      s.hostel?.toLowerCase() === searchHostel.toLowerCase();

    return nameMatch && yearMatch && hostelMatch;
  });

  /* ================= EXPORT CSV ================= */
  const exportToCSV = () => {
    if (!filteredStudents.length) {
      alert("No students to export");
      return;
    }

    const headers = ["Room", "Name", "Father Name", "Course", "Year", "Hostel"];
    const rows = filteredStudents.map((s) => [
      s.room,
      s.studentName,
      s.fatherName,
      s.course,
      s.year,
      s.hostel,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "students.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ================= IMPORT EXCEL ================= */
  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/students/import`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Import failed");

      alert("✅ Students imported successfully");
      fetchStudents();
    } catch (err) {
      console.error("❌ Import error:", err);
      alert("Error importing students");
    }
  };

  return (
    <AdminLayout>
      <h3 className="mb-4">👥 Manage Students</h3>

      {/* ===== ACTION BAR ===== */}
      <Row className="align-items-center mb-3 g-2">
        <Col xs="auto">
          <Button onClick={() => navigate("/student/register")}>
            + Add Student
          </Button>
        </Col>

        <Col xs="auto">
          <Button variant="success" onClick={exportToCSV}>
            Export CSV
          </Button>
        </Col>

        <Col xs="auto">
          <Button
            variant="secondary"
            onClick={() => document.getElementById("importExcel").click()}
          >
            Import Excel
          </Button>
          <input
            id="importExcel"
            type="file"
            accept=".xlsx,.csv"
            hidden
            onChange={handleImportExcel}
          />
        </Col>

        <Col xs="auto">
          <Form.Control
            placeholder="Search Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Col>

        <Col xs="auto">
          <Form.Select
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
          >
            <option value="">All Years</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </Form.Select>
        </Col>

        <Col xs="auto">
          <Form.Select
            value={searchHostel}
            onChange={(e) => setSearchHostel(e.target.value)}
          >
            <option value="">All Hostels</option>
            <option value="Hostel A">Hostel A</option>
            <option value="Hostel B">Hostel B</option>
            <option value="Hostel C">Hostel C</option>
            <option value="Hostel D">Hostel D</option>
          </Form.Select>
        </Col>
      </Row>

      {/* ===== TABLE ===== */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Room</th>
            <th>Name</th>
            <th>Father</th>
            <th>Course</th>
            <th>Year</th>
            <th>Hostel</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length ? (
            filteredStudents.map((s, i) => (
              <tr key={s._id}>
                <td>{i + 1}</td>
                <td>{s.room}</td>
                <td>{s.studentName}</td>
                <td>{s.fatherName}</td>
                <td>{s.course}</td>
                <td>{s.year}</td>
                <td>{s.hostel}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/students/${s._id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default ManageStudents;

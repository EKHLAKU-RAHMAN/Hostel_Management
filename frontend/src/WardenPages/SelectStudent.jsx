
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Spinner,
  Form,
} from "react-bootstrap";
import WardenLayout from "../WardenComponent/WardenLayout";
const API_URL = import.meta.env.VITE_API_URL;

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    const token = localStorage.getItem("wardenToken");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login/warden";
      return;
    }

    // ✅ ONLY fetch students
    fetch(`${API_URL}/api/warden/select/students`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((studentsData) => {
        const formattedData = studentsData.map((s) => ({
          ...s,
          status: "Present", // default status
        }));
        setStudents(formattedData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Local status change only
  const changeStatus = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
    );
  };

  // ❌ No backend submit (UI same)
  const submitAttendance = () => {
    alert("Attendance submit API removed (UI only)");
  };

  return (
    <WardenLayout>
      <Container className="py-2">
        <Row className="mb-4 align-items-center">
          <Col>
            <h3>Mark Attendance</h3>
          </Col>
          <Col className="text-end">
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ maxWidth: "200px", marginLeft: "auto" }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table bordered hover>
                      <thead className="table-light">
                        <tr>
                          <th>Student Name</th>
                          <th>Father Name</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="text-center">
                              No students found
                            </td>
                          </tr>
                        ) : (
                          students.map((s) => (
                            <tr key={s._id}>
                              <td>{s.studentName}</td>
                              <td>{s.fatherName}</td>
                              <td>
                                {s.status === "Present" && (
                                  <Badge bg="success">Present</Badge>
                                )}
                                {s.status === "Absent" && (
                                  <Badge bg="danger">Absent</Badge>
                                )}
                                {s.status === "Leave" && (
                                  <Badge bg="warning">Leave</Badge>
                                )}
                              </td>
                              <td>
                                <Button
                                  size="sm"
                                  variant={
                                    s.status === "Present"
                                      ? "success"
                                      : "outline-success"
                                  }
                                  onClick={() =>
                                    changeStatus(s._id, "Present")
                                  }
                                  className="me-2"
                                >
                                  Present
                                </Button>
                                <Button
                                  size="sm"
                                  variant={
                                    s.status === "Absent"
                                      ? "danger"
                                      : "outline-danger"
                                  }
                                  onClick={() =>
                                    changeStatus(s._id, "Absent")
                                  }
                                  className="me-2"
                                >
                                  Absent
                                </Button>
                                <Button
                                  size="sm"
                                  variant={
                                    s.status === "Leave"
                                      ? "warning"
                                      : "outline-warning"
                                  }
                                  onClick={() =>
                                    changeStatus(s._id, "Leave")
                                  }
                                >
                                  Leave
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Body className="text-center">
                <Button variant="success" size="lg" onClick={submitAttendance}>
                  Submit Attendance
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </WardenLayout>
  );
}

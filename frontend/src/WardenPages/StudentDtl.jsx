
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, ListGroup, Image, Spinner } from "react-bootstrap";
import WardenLayout from "../WardenComponent/WardenLayout";

const StudentDetail = () => {
  const { id } = useParams(); // Dynamic student id from URL
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch student data from backend
  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student");
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load student details");
        console.log(id);
        setLoading(false);
      });
  }, [id]);


  return (
    <WardenLayout>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" /> Loading student...
        </div>
      ) : error ? (
        <div className="text-center mt-5 text-danger">
          <h4>{error}</h4>
          <Button variant="secondary" onClick={() => navigate("/admin/students")}>
            Back to Students
          </Button>
        </div>
      ) : !student ? (
        <div className="text-center mt-5 text-danger">
          <h4>Student not found ❌</h4>
          <Button variant="secondary" onClick={() => navigate("/admin/students")}>
            Back to Students
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="secondary"
            className="mb-3"
            onClick={() => navigate("/warden/students")}
          >
            ← Back to Students
          </Button>

          <Card className="shadow-sm p-3">
            <Card.Body>
              <Row className="mb-3">
                {/* Profile Photo */}
                <Col md={3} className="text-center mb-3">
                  <Image
                    // src={student.photo || "https://media.istockphoto.com/id/1414942332/photo/studio-shot-of-a-young-man-carrying-a-bag.jpg?s=1024x1024&w=is&k=20&c=3NrhU59yxQ7SlFRYiw-69kr3Y_NC85QAE5psJ0p_QpM="}
                    src={
                      student.photo
                      ? `http://localhost:5000${student.photo}`
                      : "https://media.istockphoto.com/id/1414942332/photo/studio-shot-of-a-young-man-carrying-a-bag.jpg?s=1024x1024&w=is&k=20&c=3NrhU59yxQ7SlFRYiw-69kr3Y_NC85QAE5psJ0p_QpM="
                    }
                    roundedCircle
                    fluid
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </Col>

                {/* Student Info */}
                <Col md={9}>
                  <h4 className="text-primary mb-3">{student.studentName} - Profile</h4>
                  <Row>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Student Name :</strong> {student.studentName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Father's Name :</strong> {student.fatherName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Mother's Name :</strong> {student.motherName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Student Mobile :</strong> {student.studentMobile}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Student ID :</strong> {student.studentId}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <strong>Hostel :</strong> {student.hostel}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Father's Mobile :</strong> {student.fatherMobile}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Course :</strong> {student.course}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Session :</strong> {student.session}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Year :</strong> {student.year}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Room :</strong> {student.room}
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <strong>Floor :</strong> {student.floor}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </WardenLayout>
  );
};

export default StudentDetail;


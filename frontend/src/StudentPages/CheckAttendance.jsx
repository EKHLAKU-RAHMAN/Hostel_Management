import React, { useState, useEffect } from "react";
// import axios from "axios";
import StudentLayout from "../StudentComponent/StudentLayout";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api  from "../Api/axios";

export default function CheckAttendance() {
  const navigate = useNavigate();
  // ✅ hooks must be at the top level of the component
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("studentToken");
        if (!token) throw new Error("Token missing. Please login.");

        const res = await api.get(
          `${API_URL}/api/attendance/my-attendance`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAttendance(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.msg || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <StudentLayout>
      <div className="container py-4">
          <Button
            variant="secondary"
            className="mb-2"
            onClick={() => navigate("/student/home")}
          >
            ← Back
          </Button>
        <h2 className="mb-4 text-center">My Attendance</h2>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && attendance.length === 0 && (
          <div className="alert alert-info text-center">
            No attendance records found.
          </div>
        )}

        {!loading && attendance.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-primary">
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.status}</td>
                    <td>{record.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

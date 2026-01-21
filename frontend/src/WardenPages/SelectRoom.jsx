
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import WardenLayout from "../WardenComponent/WardenLayout";

const Rooms = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hostel = location.state?.hostel || null;
  const floor = location.state?.floor || null;
  const date = location.state?.date || null;

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [editStudents, setEditStudents] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completedRooms, setCompletedRooms] = useState(new Set());


  // 🔥 MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [students, setStudents] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  if (!hostel || !floor || !date) {
    return (
      <WardenLayout>
        <div style={{ padding: 20, color: "red" }}>
          <h3>Invalid navigation</h3>
          <button onClick={() => navigate("/warden/selectAttendance")} style={btn}>
            Go Back
          </button>
        </div>
      </WardenLayout>
    );
  }
  

  /* ================= FETCH ROOMS ================= */
    const fetchRooms = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/select/rooms",
          {
            params: { hostel, floor, date },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("wardenToken")}`
            }
          }
        );
        setRooms(res.data);
      } catch (err) {
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchRooms();
  }, [hostel, floor, date]);

  /* ================= OPEN MODAL ================= */
  const openRoomModal = async (room) => {
    setSelectedRoom(room);
    setShowModal(true);
    setModalLoading(true);

    try {
      const res = await axios.get(
        "http://localhost:5000/api/warden/students-by-room",
        {
          params: {
            hostel,
            floor,
            roomNo: room.roomNo,
            date
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("wardenToken")}`
          }
        }
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const updateStatus = async (studentId, status) => {
  try {
    await axios.post(
      "http://localhost:5000/api/attendance/mark",
      {
        studentId,
        date,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("wardenToken")}`
        }
      }
    );

    // 🔥 OPTIMISTIC UI UPDATE
    setCompletedRooms((prev) => {
      const updated = new Set(prev);
      updated.add(selectedRoom.roomNo);
      return updated;
    });

    // optional: update modal students
    setStudents((prev) =>
      prev.map((s) =>
        s._id === studentId ? { ...s, status } : s
      )
    );

    // optional backend sync
    await fetchRooms();

  } catch (err) {
    console.error("Attendance error:", err.response?.data || err.message);
    alert("Failed to update attendance");
  }
};


  if (loading) {
    return <WardenLayout><p style={{ padding: 20 }}>Loading...</p></WardenLayout>;
  }

  if (error) {
    return <WardenLayout><p style={{ color: "red" }}>{error}</p></WardenLayout>;
  }

  //Edit Attendance
  const openEditModal = async (room) => {
  setEditRoom(room);
  setShowEditModal(true);
  setEditLoading(true);

  try {
    const res = await axios.get(
      "http://localhost:5000/api/warden/students-by-room",
      {
        params: {
          hostel,
          floor,
          roomNo: room.roomNo,
          date
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("wardenToken")}`
        }
      }
    );
    setEditStudents(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setEditLoading(false);
  }
};

const updateEditStatus = async (studentId, status) => {
  try {
    await axios.post(
      "http://localhost:5000/api/attendance/mark",
      {
        studentId,
        date,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("wardenToken")}`
        }
      }
    );

    //Edit UI update
    setEditStudents((prev) =>
      prev.map((s) =>
        s._id === studentId ? { ...s, status } : s
      )
    );

    await fetchRooms();
  } catch (err) {
    alert("Failed to update attendance");
  }
};



  return (
    <WardenLayout>
      <div style={{ padding: 10 }}>
        <div style={{display: "flex", justifyContent: "space-between"}} className="mb-4">
          <button onClick={() => navigate("/warden/selectAttendance")} style={btn}>
             ← Back
          </button>
          <h2>Floor : {floor}</h2>
        </div>
        

        <table style={table}>
          <thead style={thead}>
            <tr>
              <th style={th}>Room No</th>
              <th style={th}>Floor</th>
              <th style={th}>Action</th>
              <th style={th}>Update</th>
            </tr>
          </thead>

          <tbody>
  {rooms.map((room) => {
  const isCompleted =
  // completedRooms.has(room.roomNo) ||
  (room.totalStudents > 0 &&
   room.totalStudents === room.markedCount);

    return (
      <tr key={room.roomNo}>
        <td style={td}>{room.roomNo}</td>
        <td style={td}>{room.floor}</td>

        

        {/* ACTION */}
        <td style={td}>
          <button
          
            style={{
              ...btn,
              background: isCompleted ? "#9ca3af" : "#2563eb",
              cursor: isCompleted ? "not-allowed" : "pointer"
            }}
            disabled={isCompleted}
            onClick={() => openRoomModal(room)}
          >
            {isCompleted ? "Completed" : "Show"}
          </button>
        </td>
        <td style={td}>
          <button
          style={{border: "none", cursor: "pointer"}}
          variant="warning"
          onClick={() => openEditModal(room)} 
          className=" ">✏️Edit
          </button>
          
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <div style={modalHeader}>
              <h3>Room {selectedRoom?.roomNo}</h3>
              <button onClick={() => setShowModal(false)} style={closeBtn}>✕</button>
            </div>

            {modalLoading ? (
              <p>Loading students...</p>
            ) : (
              <table style={table}>
                <thead style={thead}>
                  <tr>
                    <th style={th}>Student</th>
                    <th style={th}>Father</th>
                    <th style={th}>Status</th>
                    <th style={th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id}>
                      <td style={td}>{s.studentName}</td>
                      <td style={td}>{s.fatherName}</td>
                      <td style={td}>{s.status || "-"}</td>
                      <td style={td}>
                        <button style={present} onClick={() => updateStatus(s._id, "Present")}>P</button>
                        <button style={absent} onClick={() => updateStatus(s._id, "Absent")}>A</button> <br />
                        <button style={leave} onClick={() => updateStatus(s._id, "Leave")}>L</button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Edit modal */}
      {showEditModal && (
  <div style={overlay}>
    <div style={modal}>
      <div style={modalHeader}>
        <h3>Edit Attendance – Room {editRoom?.roomNo}</h3>
        <button onClick={() => setShowEditModal(false)} style={closeBtn}>✕</button>
      </div>

      {editLoading ? (
        <p>Loading...</p>
      ) : (
        <table style={table}>
          <thead style={thead}>
            <tr>
              <th style={th}>Student</th>
              <th style={th}>Father</th>
              <th style={th}>Status</th>
              <th style={th}>Update</th>
            </tr>
          </thead>
          <tbody>
            {editStudents.map((s) => (
              <tr key={s._id}>
                <td style={td}>{s.studentName}</td>
                <td style={td}>{s.fatherName}</td>
                <td style={td}>{s.status}</td>
                <td style={td}>
                  <button className="attendance-btn" style={present} onClick={() => updateEditStatus(s._id, "Present")}>P</button>
                  <button style={absent} onClick={() => updateEditStatus(s._id, "Absent")}>A</button> <br />
                  <button style={leave} onClick={() => updateEditStatus(s._id, "Leave")}>L</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
)}

    </WardenLayout>
  );
};

export default Rooms;


/* ================= STYLES ================= */


const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const thead = {
  background: "#f3f4f6"
};

const th = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
  fontWeight: "600"
};

const td = {
  padding: "8px",
  border: "1px solid #ddd",
  textAlign: "center"
};

const btn = {
  padding: "6px 14px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modal = {
  background: "#fff",
  width: "95%",
  maxWidth: "850px",
  padding: "20px",
  borderRadius: "8px",
  maxHeight: "90vh",
  overflowY: "auto"
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px"
};

const closeBtn = {
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer"
};

const present = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "4px 8px",
  marginRight: "4px",
  cursor: "pointer",
  width: "100%",
  marginBottom: "2px",
  borderRadius: "4px",
};

const absent = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "4px 8px",
  marginRight: "4px",
  cursor: "pointer",
  width: "100%",
  marginBottom: "2px",
  borderRadius: "4px",
};

const leave = {
  background: "#ca8a04",
  color: "#fff",
  border: "none",
  padding: "4px 8px",
  cursor: "pointer",
  width: "100%",
  marginBottom: "2px",
  borderRadius: "4px",
};


const actionBox = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const actionBtn = {
  padding: "6px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "500"
};

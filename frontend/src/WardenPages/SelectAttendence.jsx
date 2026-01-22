
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import WardenLayout from "../WardenComponent/WardenLayout";
import api from "../Api/axios";

const SelectAttendanceCriteria = () => {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    hostel: "",
    floor: "",
    date: today
  });

  const [hostels, setHostels] = useState([]);
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH HOSTELS ================= */
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/api/attendance-selection/hostels`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("wardenToken")}`
            }
          }
        );
        setHostels(res.data);
      } catch (err) {
        alert("Failed to load hostels");
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  /* ================= FETCH FLOORS ON HOSTEL CHANGE ================= */
  useEffect(() => {
    if (!formData.hostel) {
      setFloors([]);
      setFormData((prev) => ({ ...prev, floor: "" }));
      return;
    }

    const fetchFloors = async () => {
      try {
        const res = await api.get(
          `/api/attendance-selection/floors/${formData.hostel}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("wardenToken")}`
            }
          }
        );
        setFloors(res.data);
      } catch (err) {
        alert("Failed to load floors");
      }
    };

    fetchFloors();
  }, [formData.hostel]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDate = new Date(formData.date);
    const currentDate = new Date(today);

    if (selectedDate > currentDate) {
      alert("Future date attendance is not allowed");
      return;
    }

    if (!formData.hostel || !formData.floor || !formData.date) {
      alert("Please select all fields");
      return;
    }

    navigate("/warden/selectRoom", {
      state: formData
    });
  };

  return (
    <>
      <WardenLayout />
          {/* <Button
            variant="secondary"
            className="mb-3"
            onClick={() => navigate("/warden/dashboard")}
          >
            ← Back
        </Button> */}
      <div style={styles.container}>
        <h2 style={styles.heading}>Attendance Selection</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* DATE */}
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            max={today}
            onChange={handleChange}
            style={styles.input}
          />

          {/* HOSTEL */}
          <label>Hostel</label>
          <select
            name="hostel"
            value={formData.hostel}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Hostel</option>
            {hostels.map((hostel, index) => (
              <option key={index} value={hostel}>
                {hostel}
              </option>
            ))}
          </select>

          {/* FLOOR */}
          <label>Floor</label>
          <select
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            style={styles.input}
            disabled={!floors.length}
          >
            <option value="">Select Floor</option>
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                Floor {floor}
              </option>
            ))}
          </select>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Loading..." : "Proceed to Attendance"}
          </button>
        </form>
      </div>
    </>
  );
};

/* ================= STYLES ================= */
const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    marginTop: "5px"
  },
  button: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default SelectAttendanceCriteria;

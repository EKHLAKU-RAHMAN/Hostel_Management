
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Form,
  Modal,
  Badge,
  ListGroup,
} from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [students, setStudents] = useState([]);

  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);

  // ✅ OPTIONS
  const hostelOptions = ["Hostel A", "Hostel B", "Hostel C", "Hostel D"];
  const floorOptions = ["Ground", "First", "Second", "Third"];
  const capacityOptions = [1, 2, 3, 4];

  // ✅ ADD ROOM STATE
  const [newRoom, setNewRoom] = useState({
    roomNo: "",
    capacity: "",
    hostel: "",
    floor: "",
  });

  // ✅ EDIT ROOM STATE
  const [editRoom, setEditRoom] = useState({
    _id: "",
    roomNo: "",
    capacity: "",
    hostel: "",
    floor: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  // ================= API =================

  const fetchRooms = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/rooms`);
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Fetch rooms error", err);
    }
  };

  const handleView = async (room) => {
    setSelectedRoom(room);
    setShowViewModal(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/rooms/${room.roomNo}/students`
      );
      const data = await res.json();
      setStudents(data);
    } catch {
      setStudents([]);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/addRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Room added successfully");
        fetchRooms();
        setShowAddModal(false);
        setNewRoom({ roomNo: "", capacity: "", hostel: "", floor: "" });
      } else {
        alert(data.message);
      }
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    await fetch(`${process.env.REACT_APP_API_URL}/api/rooms/${id}`, {
      method: "DELETE",
    });
    fetchRooms();
  };

  const openEditModal = (room) => {
    setEditRoom(room);
    setShowEditModal(true);
  };

  const handleEditRoom = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/rooms/${editRoom._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editRoom),
        }
      );
      if (res.ok) {
        alert("Room updated");
        fetchRooms();
        setShowEditModal(false);
      }
    } finally {
      setUpdating(false);
    }
  };

  const filteredRooms = rooms.filter((r) =>
    r.roomNo.toLowerCase().includes(search.toLowerCase())
  );

  // ================= UI =================

  return (
    <AdminLayout>
      <div className="p-4">
        <h3>🏠 Room Management</h3>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              placeholder="Search Room No"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col className="text-end">
            <Button onClick={() => setShowAddModal(true)}>➕ Add Room</Button>
          </Col>
        </Row>

        <Table bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Hostel</th>
              <th>Room</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.hostel}</td>
                <td>{r.roomNo}</td>
                <td>{r.capacity}</td>
                <td>
                  {r.occupied >= r.capacity ? (
                    <Badge bg="danger">Full</Badge>
                  ) : (
                    <Badge bg="success">
                      Available ({r.capacity - r.occupied})
                    </Badge>
                  )}
                </td>
                <td>
                  <Button size="sm" onClick={() => handleView(r)}>
                    View
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => openEditModal(r)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteRoom(r._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* ================= VIEW ROOM MODAL ================= */}
<Modal
  show={showViewModal}
  onHide={() => setShowViewModal(false)}
  centered
  size="lg"
>
  <Modal.Header closeButton>
    <Modal.Title>
      👀 Room Details – {selectedRoom?.roomNo}
    </Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {selectedRoom && (
      <>
        <Row className="mb-3">
          <Col md={6}>
            <p><strong>Hostel:</strong> {selectedRoom.hostel}</p>
            <p><strong>Floor:</strong> {selectedRoom.floor}</p>
          </Col>
          <Col md={6}>
            <p><strong>Capacity:</strong> {selectedRoom.capacity}</p>
            <p><strong>Occupied:</strong> {selectedRoom.occupied || 0}</p>
            <p>
              <strong>Available:</strong>{" "}
              {Math.max(
                selectedRoom.capacity - (selectedRoom.occupied || 0),
                0
              )}
            </p>
          </Col>
        </Row>

        <hr />

        <h5>👨‍🎓 Students in this Room</h5>

        {students.length > 0 ? (
          <ListGroup>
            {students.map((s) => (
              <ListGroup.Item key={s._id}>
                <strong>{s.studentName}</strong>
                <div className="text-muted">
                  Father: {s.fatherName}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-center text-muted">
            No students assigned to this room
          </p>
        )}
      </>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowViewModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


        {/* ================= ADD / EDIT MODALS ================= */}
        {[{ title: "Add Room", data: newRoom, setData: setNewRoom, submit: handleAddRoom, show: showAddModal, setShow: setShowAddModal, loading: adding, btn: "Save" },
          { title: "Edit Room", data: editRoom, setData: setEditRoom, submit: handleEditRoom, show: showEditModal, setShow: setShowEditModal, loading: updating, btn: "Update" }
        ].map((m, idx) => (
          <Modal key={idx} show={m.show} onHide={() => m.setShow(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>{m.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={m.submit}>
                <Form.Control className="mb-2" placeholder="Room No"
                  value={m.data.roomNo}
                  onChange={(e) => m.setData({ ...m.data, roomNo: e.target.value })}
                  required
                />
                <Form.Select className="mb-2"
                  value={m.data.capacity}
                  onChange={(e) => m.setData({ ...m.data, capacity: e.target.value })}
                  required>
                  <option value="">Capacity</option>
                  {capacityOptions.map((c) => <option key={c}>{c}</option>)}
                </Form.Select>

                <Form.Select className="mb-2"
                  value={m.data.hostel}
                  onChange={(e) => m.setData({ ...m.data, hostel: e.target.value })}
                  required>
                  <option value="">Hostel</option>
                  {hostelOptions.map((h) => <option key={h}>{h}</option>)}
                </Form.Select>

                <Form.Select className="mb-3"
                  value={m.data.floor}
                  onChange={(e) => m.setData({ ...m.data, floor: e.target.value })}
                  required>
                  <option value="">Floor</option>
                  {floorOptions.map((f) => <option key={f}>{f}</option>)}
                </Form.Select>

                <Button type="submit" disabled={m.loading}>
                  {m.loading ? "Processing..." : m.btn}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        ))}
      </div>
    </AdminLayout>
  );
};

export default RoomManagement;

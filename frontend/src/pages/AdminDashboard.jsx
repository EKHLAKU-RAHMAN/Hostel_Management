
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminLayout from "../AdminComponent/AdminLayout";
import axios from "axios";
import PeopleIcon from "@mui/icons-material/People";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import "./AdminDashboard.css";

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalComplaints: 0,
    totalRooms: 0,
    totalWardens: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard-stats`);
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: <PeopleIcon style={{ fontSize: "32px" }} />,
      iconBg: "#E3F2FD",
      iconColor: "#1976D2",
    },
    {
      title: "Pending Complaints",
      value: stats.totalComplaints,
      icon: <ReportProblemIcon style={{ fontSize: "32px" }} />,
      iconBg: "#FFF3E0",
      iconColor: "#F57C00",
    },
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      icon: <MeetingRoomIcon style={{ fontSize: "32px" }} />,
      iconBg: "#E8F5E9",
      iconColor: "#388E3C",
    },
    {
      title: "Total Wardens",
      value: stats.totalWardens,
      icon: <SupervisorAccountIcon style={{ fontSize: "32px" }} />,
      iconBg: "#F3E5F5",
      iconColor: "#7B1FA2",
    },
  ];

  return (
    <>
      <AdminLayout>
        <div className="admin-dashboard">
          {/* Header */}
          <div className="dashboard-header">
            <div>
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">Welcome back. Here's an overview of your hostel.</p>
            </div>
          </div>

          {/* Stats Cards */}
          <Container fluid className="p-0 mt-5">
            <Row className="g-4">
              {cardData.map((item, index) => (
                <Col xs={12} sm={6} lg={3} key={index}>
                  <div className="stat-card">
                    <div className="stat-card-content">
                      <div 
                        className="stat-icon-wrapper"
                        style={{ backgroundColor: item.iconBg }}
                      >
                        <div style={{ color: item.iconColor }}>
                          {item.icon}
                        </div>
                      </div>
                      <div className="stat-info">
                        <p className="stat-label">{item.title}</p>
                        {loading ? (
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <h2 className="stat-value">{item.value}</h2>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>

          {/* Additional Section - Quick Actions */}
          <div className="mt-5">
            <h2 className="section-title">Quick Actions</h2>
            <Container fluid className="p-0">
              <Row className="g-4 mt-1">
                <Col xs={12} sm={6} lg={3}>
                  <div className="quick-action-card">
                    <div className="qa-icon">📋</div>
                    <h3>Manage Students</h3>
                    <p>View and manage student records</p>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <div className="quick-action-card">
                    <div className="qa-icon">🛎️</div>
                    <h3>Complaints</h3>
                    <p>Review pending complaints</p>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <div className="quick-action-card">
                    <div className="qa-icon">🔑</div>
                    <h3>Room Management</h3>
                    <p>Manage hostel rooms</p>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <div className="quick-action-card">
                    <div className="qa-icon">👥</div>
                    <h3>Wardens</h3>
                    <p>Manage warden staff</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboardHome;

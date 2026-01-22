

import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Button,
  Paper,
  Avatar,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../AdminComponent/AdminLayout";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import axios from "../Api/axios";

export default function AddWarden() {
  const navigate = useNavigate();

  const [warden, setWarden] = useState({
    name: "",
    fatherName: "",
    email: "",
    password: "",
    phone: "",
    hostel: "",
    yearAssigned: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setWarden({ ...warden, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/newwarden`, warden);

      if (res.data.success) {
        alert("✅ " + res.data.message);
        navigate("/admin/warden");
      } else {
        alert("⚠️ " + (res.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("❌ Error adding warden:", error);

      if (error.response && error.response.data?.message) {
        alert("⚠️ " + error.response.data.message);
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Paper
          elevation={10}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            background: "linear-gradient(135deg, #f8faff 0%, #e3ecf7 100%)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 75,
                height: 75,
                margin: "0 auto 10px",
                boxShadow: "0 4px 12px rgba(25,118,210,0.4)",
              }}
            >
              <PersonAddAlt1Icon fontSize="large" />
            </Avatar>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "primary.main", mb: 1 }}
            >
              Add New Warden
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Fill in the details below to register a new warden
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={warden.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Father's Name"
                  name="fatherName"
                  value={warden.fatherName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={warden.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={warden.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hostel Assigned"
                  name="hostel"
                  value={warden.hostel}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Year Assigned"
                  name="yearAssigned"
                  value={warden.yearAssigned}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    mt: 2,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                    ":hover": {
                      background: "linear-gradient(90deg, #1565c0, #1e88e5)",
                    },
                  }}
                >
                  {loading ? "Saving..." : "Save Warden"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </AdminLayout>
  );
}

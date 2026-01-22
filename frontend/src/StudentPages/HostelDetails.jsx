
import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import StudentLayout from "../StudentComponent/StudentLayout";

export default function HostelInfo() {
  const hostel = {
    name: "Shri Ram Group of Colleges Hostel",
    location: "Muzaffarnagar, Uttar Pradesh",

    // 👇 Year-wise wardens with name + phone
    yearWiseWardens: {
      "1st Year": { name: "Mr. Nikhil. Kumar", phone: "+91-9876543210" },
      "2nd Year": { name: "Mr. Harender. Thakur", phone: "+91-9876543211" },
      "3rd Year": { name: "Mr. Punit. Kumar", phone: "+91-9876543212" },
      "4th Year": { name: "Mr. Ashok. Kumar", phone: "+91-9876543011" },
    },

    // 👇 Chief warden details
    chiefWarden: { name: "Rajeev. Rawal", phone: "+91-9123456780" },

    about:
      "Shri Ram Group of Colleges Hostel ensures a homely atmosphere with cleanliness, discipline, and comfort. With a focus on safety, Wi-Fi, and quality meals, it provides an ideal stay for focused student life.",

    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  };

  return (
    <StudentLayout>
      <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh" }}>
        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "280px", md: "400px" },
            backgroundImage: `url(${hostel.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottomLeftRadius: "30px",
            borderBottomRightRadius: "30px",
            overflow: "hidden",
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.55)",
            }}
          />
          {/* Text */}
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              left: { xs: 20, md: 50 },
              color: "#fff",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              {hostel.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                mt: 1,
                fontWeight: 400,
                textShadow: "0px 2px 6px rgba(0,0,0,0.6)",
              }}
            >
              A perfect blend of comfort and discipline
            </Typography>
          </Box>
        </Box>

        {/* Info Card */}
        <Container
          maxWidth="md"
          sx={{
            mt: -8,
            mb: 6,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 4,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Location */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  mb: 1,
                  color: "#333",
                }}
              >
                <strong>📍 Location:</strong> {hostel.location}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Wardens */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  mb: 1,
                }}
              >
                👨‍🏫 Warden Contacts
              </Typography>
              <List dense>
                {Object.entries(hostel.yearWiseWardens).map(
                  ([year, { name, phone }], i) => (
                    <ListItem
                      key={i}
                      sx={{
                        pl: 0,
                        fontSize: "0.95rem",
                        color: "#555",
                      }}
                    >
                      <strong>{year}:</strong> {name} —{" "}
                      <span style={{ color: "#1976d2", fontWeight: "500", marginLeft: "6px" }}>
                        {phone}
                      </span>
                    </ListItem>
                  )
                )}
              </List>

              <Divider sx={{ my: 2 }} />

              {/* Chief Warden */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#333",
                }}
              >
                <strong>🏢 Chief Warden:</strong> {hostel.chiefWarden.name} —{" "}
                <span style={{ color: "#1976d2", fontWeight: "500" }}>
                  {hostel.chiefWarden.phone}
                </span>
              </Typography>

              {/* About */}
              <Typography
                variant="body2"
                sx={{
                  color: "#555",
                  lineHeight: 1.7,
                  textAlign: "justify",
                }}
              >
                {hostel.about}
              </Typography>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </StudentLayout>
  );
}

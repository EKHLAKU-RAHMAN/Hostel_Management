
// import React, { useState, useEffect } from "react";  
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   FormControlLabel,
//   Checkbox,
//   CircularProgress,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// // import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import api from "../Api/axios";

// export default function StudentLogin() {
//   const [formData, setFormData] = useState({ studentId: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [remember, setRemember] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Load saved credentials if "Remember Me" was checked
//   useEffect(() => {
//     const saved = localStorage.getItem("studentRememberMe");
//     if (saved) {
//       const { studentId, password } = JSON.parse(saved);
//       setFormData({ studentId, password });
//       setRemember(true);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await api.post(`/api/student/login`, formData);

//         localStorage.setItem("studentToken", res.data.token);
//         localStorage.setItem("studentData", JSON.stringify(res.data.student));
//       // ✅ Save token/data in localStorage (persistent) or sessionStorage (temporary)
//       if (remember) {
//         localStorage.setItem("studentToken", res.data.token || "demo-token");
//         localStorage.setItem("studentData", JSON.stringify(res.data.student));
//         localStorage.setItem(
//           "studentRememberMe",
//           JSON.stringify({ studentId: formData.studentId, password: formData.password })
//         );
//       } else {
//         sessionStorage.setItem("studentToken", res.data.token || "demo-token");
//         sessionStorage.setItem("studentData", JSON.stringify(res.data.student));
//         localStorage.removeItem("studentRememberMe");
//       }

//       // ✅ Redirect to dashboard
//       navigate("/student/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
//         padding: 2,
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         style={{ width: "100%", maxWidth: 400 }}
//       >
//         <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               mb: 2,
//             }}
//           >
//             <LockOutlinedIcon sx={{ fontSize: 40, color: "#1e3c72", mr: 1 }} />
//             <Typography variant="h5" fontWeight="bold">
//               Student Login
//             </Typography>
//           </Box>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               label="Student ID"
//               name="studentId"
//               value={formData.studentId}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//               required
//             />

//             <FormControlLabel
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={remember}
//                   onChange={(e) => setRemember(e.target.checked)}
//                 />
//               }
//               label="Remember me"
//             />

//             {error && (
//               <Typography
//                 color="error"
//                 variant="body2"
//                 sx={{ mt: 1, textAlign: "center" }}
//               >
//                 {error}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               disabled={loading}
//               sx={{
//                 mt: 2,
//                 py: 1.2,
//                 background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
//                 fontWeight: "bold",
//               }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//             </Button>
//           </form>
//         </Paper>

//         <Typography
//           variant="body2"
//           align="center"
//           sx={{ mt: 3, color: "#fff", opacity: 0.8 }}
//         >
//           © {new Date().getFullYear()} Hostel Management System
//         </Typography>
//       </motion.div>
//     </Box>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import api from "../Api/axios";

export default function StudentLogin() {
  const [formData, setFormData] = useState({ studentId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Load Remember Me
  useEffect(() => {
    const saved = localStorage.getItem("studentRememberMe");
    if (saved) {
      const { studentId, password } = JSON.parse(saved);
      setFormData({ studentId, password });
      setRemember(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/student/login", formData);

      if (remember) {
        localStorage.setItem("studentToken", res.data.token);
        localStorage.setItem("studentData", JSON.stringify(res.data.student));
        localStorage.setItem(
          "studentRememberMe",
          JSON.stringify(formData)
        );
      } else {
        sessionStorage.setItem("studentToken", res.data.token);
        sessionStorage.setItem("studentData", JSON.stringify(res.data.student));
        localStorage.removeItem("studentRememberMe");
      }

      navigate("/student/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 420 }}
      >
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2.5 }}>
          
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: "#1976d2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <LockOutlinedIcon sx={{ color: "#fff", fontSize: 28 }} />
            </Box>

            <Typography variant="h5" fontWeight={600}>
              Student Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hostel Management System
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Student ID"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Remember me</Typography>}
              sx={{ mt: 1 }}
            />

            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mt: 1.5, textAlign: "center" }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 1.5,
                textTransform: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Paper>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "text.secondary" }}
        >
          © {new Date().getFullYear()} Hostel Management System
        </Typography>
      </motion.div>
    </Box>
  );
}

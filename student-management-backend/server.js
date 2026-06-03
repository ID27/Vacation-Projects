const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const studentRoutes = require("./routes/studentRoute"); 
const departmentRoutes = require("./routes/departmentRoute"); 
const levelRoutes = require("./routes/levelRoute"); 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/levels", levelRoutes);


app.get("/", (req, res) => {
  res.send("Student Management API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
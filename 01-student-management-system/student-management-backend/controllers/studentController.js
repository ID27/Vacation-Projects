const db = require("../db");

const getAllStudents = (req, res) => {
  const sql = "SELECT s.first_name, s.last_name, s.date_of_birth, s.gender, l.level_name, d.department_name FROM students s JOIN department d ON s.department_id = d.department_id JOIN level l ON s.level_id = l.level_id";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Problem getting students",
        error: err.message,
      });
    }

    res.status(200).json(results);
  });
};


const getStudentById = (req, res) => {
  const studentId = req.params.id;
  const sql = "SELECT * FROM students WHERE student_id = ?";

  db.query(sql, [studentId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Problem getting student",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ 
        message: "Student not found" 
      });
    }

    res.status(200).json(results[0]);
  });};

  const createStudent = (req, res) => {
    const {first_name, last_name, date_of_birth, gender, email, phone, department_id, level_id} = req.body;
    if (!first_name || !last_name || !date_of_birth || !gender || !email || !phone || !department_id || !level_id){
      return res.status(400).json({
      message: "first_name, last_name, gender, email, department_id, and level_id are required",
    });
  }

    const sql = "INSERT INTO students (first_name, last_name, date_of_birth, gender, email, phone, department_id, level_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    

    db.query (
      sql,
      [ first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone, 
        department_id,
        level_id
    ], 
    (err, result) =>{
      if (err){
        return res.status(500).json({
          message: "Problem creating student",
          error: err.message,
        });

        return res.status(201).json({
          message: "Student created successfully",
          student_id: result.insertId,
        })
      }
    })
  }

  const updateStudent = (req, res) => {
    const {id} = req.params;
    const {first_name, last_name, date_of_birth, gender, email, phone, department_id, level_id} = req.body;
    if (!first_name || !last_name || !date_of_birth || !gender || !email || !phone || !department_id || !level_id){
      return res.status(400).json({
      message: "first_name, last_name, gender, email, department_id, and level_id are required",
    });
  }

  const sql = "UPDATE students SET first_name = ?, last_name = ?, date_of_birth = ?,  gender = ?, email = ?, phone = ?,  department_id = ?, level_id = ? WHERE student_id = ?";

  db.query (
    sql,
    [first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    phone, 
    department_id,
    level_id,
    id,
    ],
    (err, result) =>{
      if (err) {
        return res.status(500).json({
          message: "Problem updating student",
          error: err.message,
        });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      res.status(200).json({
        message: "Student updated successfully",
      });
    }
  )
  }

  const deleteStudent = (req, res) => {
    const {id} = req.params;
    const sql = " DELETE FROM students WHERE student_id = ?";

    db.query (sql, [id], (err, result) =>{
      if (err){
        return res.status(500).json({
          message: "Problem deleting student",
          error: err.message,
        })

        if (result.affectedRows === 0){
          return res.status(404).json({
            message: "Student not found",
          })

            res.status(200).json({
            message: "Student successfully deleted!",
          })
        }
      }
    })
  }

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};

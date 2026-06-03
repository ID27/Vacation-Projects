const db = require("../db");

const getAllDepartments = (req, res) => {
  const sql = "SELECT department_id, department_name FROM department";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Problem getting departments",
        error: err.message,
      });
    }

    res.status(200).json(results);
  });
};



module.exports = {
  getAllDepartments,
};

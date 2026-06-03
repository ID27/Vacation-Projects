const db = require("../db");

const getAllLevels = (req, res) => {
  const sql = "SELECT level_id, level_name FROM level";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Problem getting levels",
        error: err.message,
      });
    }

    res.status(200).json(results);
  });
};



module.exports = {
  getAllLevels,
};

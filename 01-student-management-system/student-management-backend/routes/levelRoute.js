const express = require("express");
const router = express.Router();

const { getAllLevels} = require("../controllers/levelController");

router.get("/", getAllLevels);

module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const XLSX = require("xlsx");
const Student = require("../models/Student");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/students/import", upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!data.length) {
      return res.status(400).send("Empty file");
    }

    await Student.insertMany(data);

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Import failed");
  }
});


module.exports = router;

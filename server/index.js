const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const applyJob = require("./applyJobs");
require("dotenv").config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("No file uploaded.");

        // Read the Excel file
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const jobData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (jobData.length === 0) return res.status(400).send("Excel file is empty.");

        // Loop through each job application
        for (const job of jobData) {
            console.log(`Applying for job: ${job.title}`);
            await applyJob(job);
        }

        res.json({ message: "Job applications submitted successfully!" });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(5734, () => console.log("Server running on port 5734...🚀🚀"));

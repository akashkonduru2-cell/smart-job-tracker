const express = require("express");
const Resume = require("../models/Resume");
const authenticateToken = require("../middleware/authMiddleware");
const { calculateMatch } = require("../utils/skillMatcher");

const router = express.Router();

router.use(authenticateToken);

router.post("/analyze", async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Job description is required"
      });
    }

    const resume = await Resume.findOne({
      user: req.user.userId
    });

    if (!resume) {
      return res.status(404).json({
        message: "Please upload a resume first"
      });
    }

    if (!resume.extractedText) {
      return res.status(400).json({
        message: "No text could be extracted from your resume"
      });
    }

    const result = calculateMatch(
      resume.extractedText,
      jobDescription
    );

    res.json({
      message: "Job description analyzed successfully",
      result
    });
  } catch (error) {
    console.error(
      "Job matching error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to analyze job description"
    });
  }
});

module.exports = router;
const express = require("express");
const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const Resume = require("../models/Resume");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a PDF resume"
        });
      }

      const existingResume = await Resume.findOne({
        user: req.user.userId
      });

      if (existingResume) {
        try {
          if (fs.existsSync(existingResume.filePath)) {
            fs.unlinkSync(existingResume.filePath);
          }
        } catch (error) {
          console.error(
            "Failed to delete old resume:",
            error.message
          );
        }
      }

      const pdfBuffer = fs.readFileSync(req.file.path);

      const parser = new PDFParse({
        data: pdfBuffer
      });

      const pdfData = await parser.getText();

      await parser.destroy();

      const resume = await Resume.findOneAndUpdate(
        {
          user: req.user.userId
        },
        {
          user: req.user.userId,
          originalName: req.file.originalname,
          fileName: req.file.filename,
          filePath: req.file.path,
          extractedText: pdfData.text,
          uploadedAt: new Date()
        },
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      );

      res.status(201).json({
        message: "Resume uploaded successfully",
        resume: {
          id: resume._id,
          originalName: resume.originalName,
          uploadedAt: resume.uploadedAt,
          extractedTextLength:
            resume.extractedText.length
        }
      });
    } catch (error) {
      console.error(
        "Resume upload error:",
        error.message
      );

      if (req.file) {
        try {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
        } catch (cleanupError) {
          console.error(
            "Failed to clean up file:",
            cleanupError.message
          );
        }
      }

      res.status(500).json({
        message: "Failed to upload resume",
        error: error.message
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user.userId
    }).select(
      "-filePath -fileName -extractedText"
    );

    if (!resume) {
      return res.status(404).json({
        message: "No resume found"
      });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resume"
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user.userId
    });

    if (!resume) {
      return res.status(404).json({
        message: "No resume found"
      });
    }

    if (fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }

    await Resume.deleteOne({
      _id: resume._id
    });

    res.json({
      message: "Resume deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete resume"
    });
  }
});

module.exports = router;
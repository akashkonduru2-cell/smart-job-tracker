const express = require("express");
const JobApplication = require("../models/JobApplication");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.get("/", async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {
      user: req.user.userId
    };

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    const applications = await JobApplication.find(filter).sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications"
    });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const applications = await JobApplication.find({
      user: req.user.userId
    });

    const stats = {
      total: applications.length,
      saved: applications.filter(a => a.status === "Saved").length,
      applied: applications.filter(a => a.status === "Applied").length,
      assessment: applications.filter(a => a.status === "Assessment").length,
      interview: applications.filter(a => a.status === "Interview").length,
      offer: applications.filter(a => a.status === "Offer").length,
      rejected: applications.filter(a => a.status === "Rejected").length
    };

    const decided = stats.offer + stats.rejected;

    stats.successRate = decided
      ? Math.round((stats.offer / decided) * 100)
      : 0;

    res.json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch statistics"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const application = await JobApplication.create({
      ...req.body,
      user: req.user.userId
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({
      message: "Invalid application data",
      error: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const application = await JobApplication.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update application"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const application = await JobApplication.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Application deleted"
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete application"
    });
  }
});

module.exports = router;
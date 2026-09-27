const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true,
      default: ""
    },
    jobUrl: {
      type: String,
      trim: true,
      default: ""
    },
    salary: {
      type: String,
      trim: true,
      default: ""
    },
    status: {
      type: String,
      enum: ["Saved", "Applied", "Assessment", "Interview", "Offer", "Rejected"],
      default: "Saved"
    },
    appliedDate: {
      type: Date,
      default: null
    },
    interviewDate: {
      type: Date,
      default: null
    },
    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
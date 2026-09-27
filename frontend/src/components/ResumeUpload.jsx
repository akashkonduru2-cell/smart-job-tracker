import { useEffect, useState } from "react";
import {
  getResume,
  uploadResume,
  deleteResume
} from "../api";

export default function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadResume = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getResume();
      setResume(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setMessage("");
    setError("");

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const data = await uploadResume(file);

      setMessage(data.message);
      await loadResume();
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your resume?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setMessage("");
      setError("");

      const data = await deleteResume();

      setResume(null);
      setMessage(data.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="resume-card">
      <div className="resume-header">
        <div>
          <small>RESUME</small>
          <h2>Resume Manager</h2>
        </div>
      </div>

      {loading ? (
        <p>Loading resume...</p>
      ) : (
        <>
          {resume ? (
            <div className="resume-info">
              <div>
                <strong>{resume.originalName}</strong>

                <p>
                  Uploaded{" "}
                  {new Date(
                    resume.uploadedAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </p>
              </div>

              <button
                className="danger-button"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          ) : (
            <p className="resume-empty">
              No resume uploaded yet.
            </p>
          )}

          <label className="resume-upload-button">
            {uploading
              ? "Uploading..."
              : resume
              ? "Replace Resume"
              : "Upload Resume"}

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>

          <p className="resume-hint">
            PDF only · Maximum size 5 MB
          </p>

          {message && (
            <div className="resume-success">
              {message}
            </div>
          )}

          {error && (
            <div className="resume-error">
              {error}
            </div>
          )}
        </>
      )}
    </section>
  );
}
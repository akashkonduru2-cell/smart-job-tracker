import { useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function JobMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/matching/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            jobDescription
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to analyze job description"
        );
      }

      setResult(data.result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="matcher-card">
      <div className="matcher-header">
        <div>
          <small>JOB MATCHING</small>
          <h2>Analyze Job Description</h2>
          <p>
            Compare a job description with the skills extracted
            from your resume.
          </p>
        </div>
      </div>

      <textarea
        className="job-description-input"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        rows="8"
      />

      {error && (
        <div className="matcher-error">
          {error}
        </div>
      )}

      <button
        className="primary matcher-button"
        onClick={analyzeJob}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Job"}
      </button>

      {result && (
        <div className="matcher-result">
          <div className="match-score">
            <small>MATCH SCORE</small>

            <div className="score">
              {result.matchPercentage}%
            </div>

            <p>
              {result.matchedSkills.length} of{" "}
              {result.requiredSkills.length} required skills
              matched
            </p>
          </div>

          <div className="skills-section">
            <div>
              <h3>Matched Skills</h3>

              {result.matchedSkills.length === 0 ? (
                <p className="no-skills">
                  No matching skills found.
                </p>
              ) : (
                <div className="skill-list">
                  {result.matchedSkills.map((skill) => (
                    <span
                      className="skill matched"
                      key={skill}
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3>Missing Skills</h3>

              {result.missingSkills.length === 0 ? (
                <p className="no-skills">
                  No missing skills.
                </p>
              ) : (
                <div className="skill-list">
                  {result.missingSkills.map((skill) => (
                    <span
                      className="skill missing"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
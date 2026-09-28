import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import ResetPassword from "./ResetPassword";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationTable from "./components/ApplicationTable";
import StatCard from "./components/StatCard";
import Analytics from "./components/Analytics";
import UpcomingInterviews from "./components/UpcomingInterviews";
import ResumeUpload from "./components/ResumeUpload";
import JobMatcher from "./components/JobMatcher";
import {
  getApplications,
  getStats,
  createApplication,
  updateApplication,
  deleteApplication
} from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [stats, setStats] = useState({
    total: 0,
    saved: 0,
    applied: 0,
    assessment: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    successRate: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, search, statusFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [applicationsData, statsData] =
        await Promise.all([
          getApplications(statusFilter, search),
          getStats()
        ]);

      setApplications(applicationsData);
      setStats(statsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setApplications([]);
    setEditing(null);
  };

  const handleCreate = async (application) => {
    try {
      setError("");

      await createApplication(application);
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (application) => {
    setEditing(application);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleUpdate = async (application) => {
    try {
      setError("");

      await updateApplication(
        application._id,
        application
      );

      setEditing(null);
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleStatusChange = async (
    application,
    newStatus
  ) => {
    try {
      setError("");

      await updateApplication(application._id, {
        ...application,
        status: newStatus
      });

      await loadData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteApplication(id);
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((current) => !current);
  };

  const isResetPasswordPage =
    window.location.pathname === "/reset-password";

  if (isResetPasswordPage) {
    return <ResetPassword />;
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Smart Job Tracker</h1>

          <p>
            Track your job applications in one place.
          </p>
        </div>

        <div className="user-section">
          <span>Welcome, {user.name}</span>

          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <section className="stats-grid">
          <StatCard
            title="Total"
            value={stats.total}
          />

          <StatCard
            title="Applied"
            value={stats.applied}
          />

          <StatCard
            title="Assessment"
            value={stats.assessment}
          />

          <StatCard
            title="Interview"
            value={stats.interview}
          />

          <StatCard
            title="Offers"
            value={stats.offer}
          />

          <StatCard
            title="Rejected"
            value={stats.rejected}
          />
        </section>

        <section className="dashboard-grid">
          <Analytics stats={stats} />

          <UpcomingInterviews
            applications={applications}
          />
        </section>

        <section className="dashboard-section">
          <ResumeUpload />
        </section>

        <section className="dashboard-section">
          <JobMatcher />
        </section>

        <section className="dashboard-section">
          <ApplicationForm
            editing={editing}
            onSubmit={
              editing
                ? handleUpdate
                : handleCreate
            }
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="dashboard-section">
          <div className="filters">
            <input
              type="text"
              placeholder="Search company, role or location..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Statuses
              </option>

              <option value="Saved">
                Saved
              </option>

              <option value="Applied">
                Applied
              </option>

              <option value="Assessment">
                Assessment
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Offer">
                Offer
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>

          {loading ? (
            <p>Loading applications...</p>
          ) : (
            <ApplicationTable
              applications={applications}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
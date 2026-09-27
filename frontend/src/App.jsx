import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationTable from "./components/ApplicationTable";
import StatCard from "./components/StatCard";
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
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [applicationsData, statsData] = await Promise.all([
        getApplications(),
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
      await updateApplication(application._id, application);
      setEditing(null);
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
      await deleteApplication(id);
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Smart Job Tracker</h1>
          <p>Track your job applications in one place.</p>
        </div>

        <div className="user-section">
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        {error && <div className="error-message">{error}</div>}

        <section className="stats-grid">
          <StatCard title="Total" value={stats.total} />
          <StatCard title="Applied" value={stats.applied} />
          <StatCard title="Assessment" value={stats.assessment} />
          <StatCard title="Interview" value={stats.interview} />
          <StatCard title="Offers" value={stats.offer} />
          <StatCard title="Rejected" value={stats.rejected} />
        </section>

        <section className="dashboard-section">
          <ApplicationForm
            editing={editing}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="dashboard-section">
          {loading ? (
            <p>Loading applications...</p>
          ) : (
            <ApplicationTable
              applications={applications}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
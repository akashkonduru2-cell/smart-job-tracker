import { CalendarDays } from "lucide-react";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

export default function UpcomingInterviews({ applications }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = applications
    .filter((application) => {
      if (!application.interviewDate) {
        return false;
      }

      const interviewDate = new Date(application.interviewDate);
      interviewDate.setHours(0, 0, 0, 0);

      return interviewDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.interviewDate) -
        new Date(b.interviewDate)
    )
    .slice(0, 5);

  return (
    <div className="upcoming-card">
      <div className="upcoming-header">
        <div>
          <small>UPCOMING</small>
          <h2>Interviews</h2>
        </div>

        <CalendarDays size={22} />
      </div>

      {upcoming.length === 0 ? (
        <div className="upcoming-empty">
          <p>No upcoming interviews.</p>
        </div>
      ) : (
        <div className="interview-list">
          {upcoming.map((application) => (
            <div
              className="interview-item"
              key={application._id}
            >
              <div className="interview-icon">
                {application.company[0]?.toUpperCase()}
              </div>

              <div className="interview-info">
                <strong>{application.company}</strong>
                <span>{application.role}</span>
              </div>

              <div className="interview-date">
                {formatDate(application.interviewDate)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
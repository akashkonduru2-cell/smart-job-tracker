import { Pencil, Trash2, ExternalLink } from "lucide-react";

const date = (x) =>
  x
    ? new Date(x).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : "—";

export default function ApplicationTable({
  applications,
  onEdit,
  onDelete
}) {
  if (!applications.length) {
    return (
      <div className="empty">
        <h3>No applications found</h3>
        <p>Add your first application or change the filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Applied</th>
            <th>Interview</th>
            <th>Location</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {applications.map((a) => (
            <tr key={a._id}>
              <td>
                <div className="company">
                  <b>{a.company[0]?.toUpperCase()}</b>

                  <span>
                    <strong>{a.company}</strong>

                    {a.jobUrl && (
                      <a
                        href={a.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Job posting <ExternalLink size={11} />
                      </a>
                    )}
                  </span>
                </div>
              </td>

              <td>{a.role}</td>

              <td>
                <span className={`status s-${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </td>

              <td>{date(a.appliedDate)}</td>

              <td>{date(a.interviewDate)}</td>

              <td>{a.location || "—"}</td>

              <td>
                <button
                  className="icon"
                  onClick={() => onEdit(a)}
                  title="Edit application"
                >
                  <Pencil size={15} />
                </button>

                <button
                  className="icon danger"
                  onClick={() => onDelete(a._id)}
                  title="Delete application"
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
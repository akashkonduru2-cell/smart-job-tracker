import { useEffect, useState } from "react";

const blank = {
  company: "",
  role: "",
  location: "",
  jobUrl: "",
  salary: "",
  status: "Saved",
  appliedDate: "",
  interviewDate: "",
  notes: ""
};

export default function ApplicationForm({
  editing,
  onSubmit,
  onCancel
}) {
  const [f, setF] = useState(blank);

  useEffect(() => {
    if (editing) {
      setF({
        ...blank,
        ...editing,
        appliedDate: editing.appliedDate
          ? editing.appliedDate.slice(0, 10)
          : "",
        interviewDate: editing.interviewDate
          ? editing.interviewDate.slice(0, 10)
          : ""
      });
    } else {
      setF(blank);
    }
  }, [editing]);

  const change = (e) => {
    setF({
      ...f,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(f);
  };

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-head">
        <div>
          <small>
            {editing ? "EDIT APPLICATION" : "NEW APPLICATION"}
          </small>

          <h2>
            {editing ? "Update application" : "Add a job"}
          </h2>
        </div>

        {editing && (
          <button
            type="button"
            className="ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="form-grid">
        {[
          ["company", "Company *", "e.g. Amazon"],
          ["role", "Role *", "e.g. SDE I"],
          ["location", "Location", "e.g. Hyderabad"],
          ["salary", "Salary / CTC", "e.g. 12 LPA"],
          ["appliedDate", "Application date", ""],
          ["interviewDate", "Interview date", ""],
          ["jobUrl", "Job URL", "https://..."]
        ].map(([name, label, placeholder]) => (
          <label key={name}>
            {label}

            <input
              type={
                name.includes("Date")
                  ? "date"
                  : "text"
              }
              name={name}
              value={f[name] || ""}
              onChange={change}
              placeholder={placeholder}
            />
          </label>
        ))}

        <label>
          Status

          <select
            name="status"
            value={f.status}
            onChange={change}
          >
            {[
              "Saved",
              "Applied",
              "Assessment",
              "Interview",
              "Offer",
              "Rejected"
            ].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="full">
          Notes

          <textarea
            name="notes"
            value={f.notes}
            onChange={change}
            rows="3"
            placeholder="Next steps, preparation topics, recruiter notes..."
          />
        </label>
      </div>

      <button className="primary" type="submit">
        {editing ? "Save changes" : "Add application"}
      </button>
    </form>
  );
}
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#3b82f6",
  "#a855f7",
  "#ef4444"
];

export default function Analytics({ stats }) {
  const data = [
    { name: "Saved", value: stats.saved },
    { name: "Applied", value: stats.applied },
    { name: "Assessment", value: stats.assessment },
    { name: "Interview", value: stats.interview },
    { name: "Offer", value: stats.offer },
    { name: "Rejected", value: stats.rejected }
  ].filter((item) => item.value > 0);

  return (
    <section className="analytics">
      <div className="analytics-card">
        <div className="analytics-header">
          <div>
            <small>APPLICATION PIPELINE</small>
            <h2>Application Status</h2>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="analytics-empty">
            <p>No application data available yet.</p>
          </div>
        ) : (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  innerRadius={60}
                  paddingAngle={3}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="analytics-card success-card">
        <small>SUCCESS RATE</small>

        <div className="success-value">
          {stats.successRate}%
        </div>

        <p>
          Based on offers compared with decided applications.
        </p>

        <div className="success-bar">
          <div
            className="success-progress"
            style={{
              width: `${stats.successRate}%`
            }}
          />
        </div>
      </div>
    </section>
  );
}
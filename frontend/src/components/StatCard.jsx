export default function StatCard({label,value,accent}){return <div className="stat-card"><i className={accent}></i><div><p>{label}</p><strong>{value}</strong></div></div>}

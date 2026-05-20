interface StatsCardProps {
  label: string
  value: number
  icon: string
  danger?: boolean
}

function StatsCard({ label, value, icon, danger }: StatsCardProps) {
  return (
    <div className="stat-card">
      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
      <div 
        className="stat-value" 
        style={danger ? { color: 'var(--danger)', textShadow: '0 0 10px var(--danger)' } : {}}
      >
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default StatsCard
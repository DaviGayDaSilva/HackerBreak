interface Threat {
  id: string
  source_ip: string
  type: string
  level: string
  timestamp: string
}

interface DashboardPanelProps {
  threats: Threat[]
  shieldActive: boolean
}

function DashboardPanel({ threats, shieldActive }: DashboardPanelProps) {
  const chartData = Array.from({ length: 20 }, () => Math.random() * 100)

  return (
    <div className="dashboard" style={{ marginTop: '20px' }}>
      {/* Shield Status Banner */}
      <div 
        className="card" 
        style={{ 
          gridColumn: '1 / -1',
          background: shieldActive 
            ? 'linear-gradient(135deg, #1a0008 0%, #0a0a0a 100%)'
            : 'var(--bg-card)',
          padding: '30px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ color: 'var(--red-primary)', marginBottom: '10px' }}>
              {shieldActive ? '🛡️ SHIELD ATIVO' : '🔓 SHIELD INATIVO'}
            </h2>
            <p style={{ fontSize: '14px' }}>
              {shieldActive 
                ? 'Proteção máxima ativada. Todas as conexões monitoradas.'
                : 'Ative o shield para proteger seu sistema.'
              }
            </p>
          </div>
          <div style={{ 
            fontSize: '48px',
            animation: shieldActive ? 'pulse-glow 2s ease-in-out infinite' : 'none'
          }}>
            {shieldActive ? '🛡️' : '🔓'}
          </div>
        </div>
      </div>

      {/* Real-time Chart */}
      <div className="card">
        <h2>TRÁFEGO EM TEMPO REAL</h2>
        <div className="chart-container" style={{ marginTop: '20px', height: '150px' }}>
          {chartData.map((value, i) => (
            <div 
              key={i}
              className="chart-bar"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>

      {/* Recent Threats */}
      <div className="card">
        <h2>AMEAÇAS RECENTES</h2>
        <div className="threat-list" style={{ marginTop: '20px' }}>
          { threats.length === 0 ? (
            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              color: 'var(--success)'
            }}>
              ✓ Nenhuma ameaça detectada
            </div>
          ) : (
            threats.slice(0, 5).map((threat) => (
              <div 
                key={threat.id} 
                className={`threat-item ${threat.level.toLowerCase()}`}
              >
                <div>
                  <div style={{ color: 'var(--red-primary)', fontFamily: 'var(--font-mono)' }}>
                    {threat.source_ip}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {threat.type}
                  </div>
                </div>
                <div style={{ 
                  padding: '4px 10px',
                  background: threat.level === 'High' ? 'var(--danger)' : 'var(--warning)',
                  color: 'var(--bg-primary)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}>
                  {threat.level}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* System Info */}
      <div className="card">
        <h2>INFORMAÇÕES DO SISTEMA</h2>
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>UPTIME</div>
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--red-primary)',
                marginTop: '4px'
              }}>
                00:00:00
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>CPU</div>
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--red-primary)',
                marginTop: '4px'
              }}>
                12%
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>MEMÓRIA</div>
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--red-primary)',
                marginTop: '4px'
              }}>
                256 MB
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>STATUS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <span className="status-dot status-active"></span>
                <span style={{ color: 'var(--success)' }}>PROTEGIDO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2>AÇÕES RÁPIDAS</h2>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="btn" style={{ width: '100%' }}>Escanear Sistema</button>
          <button className="btn" style={{ width: '100%' }}>Ver Conexões</button>
          <button className="btn btn-danger" style={{ width: '100%' }}>Bloquear Todos</button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPanel
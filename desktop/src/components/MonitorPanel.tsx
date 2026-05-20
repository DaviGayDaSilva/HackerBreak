function MonitorPanel() {
  return (
    <div style={{ padding: '20px' }}>
      <div className="card">
        <h2>LIVE MONITOR</h2>
        <div style={{ marginTop: '30px', textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>👁️</div>
          <h2 style={{ color: 'var(--red-primary)', marginBottom: '10px' }}>MONITOR EM TEMPO REAL</h2>
          <p style={{ maxWidth: '400px', margin: '0 auto' }}>
            O monitoramento em tempo real requer permissões elevated.
            Execute o aplicativo como root para habilitar.
          </p>
        </div>
      </div>

      {/* Live Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div className="card">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>🌐</div>
            <div className="stat-value">0</div>
            <div className="stat-label">CONEXÕES ATIVAS</div>
          </div>
        </div>
        <div className="card">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔄</div>
            <div className="stat-value">0</div>
            <div className="stat-label">PACOTES/S</div>
          </div>
        </div>
        <div className="card">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>📊</div>
            <div className="stat-value">0 KB</div>
            <div className="stat-label">BANDA</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitorPanel
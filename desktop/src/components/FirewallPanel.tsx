import { useState } from 'react'

function FirewallPanel() {
  const [blockedIPs, setBlockedIPs] = useState<string[]>([])
  const [newIP, setNewIP] = useState('')

  function handleBlockIP() {
    if (newIP && !blockedIPs.includes(newIP)) {
      setBlockedIPs([...blockedIPs, newIP])
      setNewIP('')
    }
  }

  function handleUnblockIP(ip: string) {
    setBlockedIPs(blockedIPs.filter(i => i !== ip))
  }

  return (
    <div style={{ padding: '20px' }}>
      <div className="card">
        <h2>FIREWALL</h2>
        
        {/* Block New IP */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="input"
            placeholder="Endereço IP..."
            value={newIP}
            onChange={(e) => setNewIP(e.target.value)}
          />
          <button 
            className="btn btn-danger"
            onClick={handleBlockIP}
            style={{ whiteSpace: 'nowrap' }}
          >
            BLOQUEAR
          </button>
        </div>
        
        {/* Blocked IPs List */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>IPS BLOQUEADOS ({blockedIPs.length})</h3>
          
          {blockedIPs.length === 0 ? (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              color: 'var(--text-muted)',
              border: '1px dashed var(--border-color)'
            }}>
              Nenhum IP bloqueado
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {blockedIPs.map((ip) => (
                <div 
                  key={ip}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    background: 'var(--bg-tertiary)',
                    borderLeft: '3px solid var(--danger)'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--red-primary)' }}>
                    {ip}
                  </span>
                  <button 
                    className="btn"
                    onClick={() => handleUnblockIP(ip)}
                    style={{ padding: '8px 16px', fontSize: '11px' }}
                  >
                    DESBLOQUEAR
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Firewall Rules */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h2>REGRAS DO FIREWALL</h2>
        
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '15px',
              background: 'var(--bg-tertiary)',
              borderLeft: '3px solid var(--success)'
            }}>
              <span>Entrada TCP/UDP</span>
              <span style={{ color: 'var(--success)' }}>PERMITIR</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '15px',
              background: 'var(--bg-tertiary)',
              borderLeft: '3px solid var(--success)'
            }}>
              <span>Saída TCP/UDP</span>
              <span style={{ color: 'var(--success)' }}>PERMITIR</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '15px',
              background: 'var(--bg-tertiary)',
              borderLeft: '3px solid var(--danger)'
            }}>
              <span>ICMP Ping</span>
              <span style={{ color: 'var(--danger)' }}>BLOQUEAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirewallPanel
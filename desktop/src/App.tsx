import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'
import Logo from './components/Logo'
import Sidebar from './components/Sidebar'
import DashboardPanel from './components/DashboardPanel'
import MonitorPanel from './components/MonitorPanel'
import TerminalPanel from './components/TerminalPanel'
import FirewallPanel from './components/FirewallPanel'
import StatsCard from './components/StatsCard'

interface AppStatus {
  shield_active: boolean
  auto_protection: boolean
  version: string
}

interface Threat {
  id: string
  source_ip: string
  type: string
  level: string
  timestamp: string
}

function App() {
  const [status, setStatus] = useState<AppStatus | null>(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [threats, setThreats] = useState<Threat[]>([])
  const [stats, setStats] = useState({
    connections: 0,
    threats: 0,
    blocked: 0,
    sessions: 0
  })

  useEffect(() => {
    loadStatus()
    loadThreats()
    
    // Update stats periodically
    const interval = setInterval(() => {
      loadThreats()
      setStats(prev => ({
        ...prev,
        connections: Math.floor(Math.random() * 100),
        threats: prev.threats + Math.floor(Math.random() * 3),
        blocked: Math.floor(Math.random() * 50),
        sessions: Math.floor(Math.random() * 20)
      }))
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  async function loadStatus() {
    try {
      const result = await invoke<AppStatus>('get_status')
      setStatus(result)
    } catch (e) {
      console.error('Failed to load status:', e)
      setStatus({ shield_active: false, auto_protection: true, version: '1.0.0' })
    }
  }

  async function loadThreats() {
    try {
      const result = await invoke<{ data: Threat[] }>('get_threats')
      if (result.data) {
        setThreats(result.data)
      }
    } catch (e) {
      console.error('Failed to load threats:', e)
    }
  }

  async function toggleShield() {
    try {
      if (status?.shield_active) {
        await invoke('disable_shield')
      } else {
        await invoke('enable_shield')
      }
      loadStatus()
    } catch (e) {
      console.error('Failed to toggle shield:', e)
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <Logo />
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Shield Status */}
        <div style={{ marginTop: 'auto', padding: '20px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>SHIELD MODE</span>
              <span className={`status-dot ${status?.shield_active ? 'status-active' : 'status-inactive'}`}></span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <button 
                className={`btn ${status?.shield_active ? 'btn-danger' : 'btn-success'}`}
                onClick={toggleShield}
                style={{ width: '100%' }}
              >
                {status?.shield_active ? 'DESATIVAR' : 'ATIVAR'}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <h1 style={{ fontSize: '18px' }}>
            <span className="glitch" style={{ animationDuration: '3s' }}>HACKER BREAK</span>
            <span className="blink">_</span>
          </h1>
          
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
              v{status?.version || '1.0.0'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="status-dot status-active"></span>
              <span style={{ fontSize: '12px' }}>ONLINE</span>
            </span>
          </div>
        </header>

        {/* Content Panels */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div style={{ padding: '20px', paddingBottom: '0' }}>
              <div className="stats-grid">
                <StatsCard 
                  label="CONEXOES ATIVAS" 
                  value={stats.connections} 
                  icon="🌐"
                />
                <StatsCard 
                  label="AMEACAS DETECTADAS" 
                  value={stats.threats} 
                  icon="🚨"
                  danger
                />
                <StatsCard 
                  label="IPS BLOQUEADOS" 
                  value={stats.blocked} 
                  icon="🚫"
                />
                <StatsCard 
                  label="SESSOES" 
                  value={stats.sessions} 
                  icon="💀"
                />
              </div>
            </div>

            <DashboardPanel 
              threats={threats}
              shieldActive={status?.shield_active || false}
            />
          </>
        )}

        {activeTab === 'monitor' && <MonitorPanel />}
        {activeTab === 'terminal' && <TerminalPanel />}
        {activeTab === 'firewall' && <FirewallPanel />}
      </main>
    </div>
  )
}

export default App
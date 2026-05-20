interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'monitor', label: 'Live Monitor', icon: '👁️' },
  { id: 'terminal', label: 'Terminal', icon: '💻' },
  { id: 'firewall', label: 'Firewall', icon: '🔥' },
  { id: 'scanner', label: 'Scanner', icon: '🔍' },
  { id: 'logs', label: 'Logs', icon: '📋' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <nav className="nav">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => onTabChange(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  )
}

export default Sidebar
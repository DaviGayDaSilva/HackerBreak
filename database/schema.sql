-- Hacker Break Database Schema
-- SQLite Database for logging and configuration

-- ============================================
-- TABLES
-- ============================================

-- Log entries table
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    level TEXT NOT NULL CHECK(level IN ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL')),
    module TEXT NOT NULL,
    message TEXT NOT NULL,
    source_ip TEXT,
    threat_level TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- Blocked IPs table
CREATE TABLE IF NOT EXISTS blocked_ips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL UNIQUE,
    reason TEXT NOT NULL,
    threat_level TEXT NOT NULL CHECK(threat_level IN ('Low', 'Medium', 'High', 'Critical')),
    country TEXT,
    blocked_at TEXT NOT NULL DEFAULT (datetime('now')),
    blocked_until TEXT,
    active INTEGER NOT NULL DEFAULT 1
);

-- Threats table
CREATE TABLE IF NOT EXISTS threats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    threat_id TEXT NOT NULL UNIQUE,
    source_ip TEXT NOT NULL,
    threat_type TEXT NOT NULL,
    threat_level TEXT NOT NULL CHECK(threat_level IN ('Low', 'Medium', 'High', 'Critical')),
    description TEXT NOT NULL,
    action_taken TEXT,
    detected_at TEXT NOT NULL DEFAULT (datetime('now')),
    acknowledged INTEGER NOT NULL DEFAULT 0
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL UNIQUE,
    src_ip TEXT NOT NULL,
    dst_ip TEXT NOT NULL,
    port INTEGER NOT NULL,
    protocol TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Active', 'Suspicious', 'Blocked', 'Terminated')),
    start_time TEXT NOT NULL DEFAULT (datetime('now')),
    end_time TEXT,
    bytes_in INTEGER NOT NULL DEFAULT 0,
    bytes_out INTEGER NOT NULL DEFAULT 0
);

-- Firewall rules table
CREATE TABLE IF NOT EXISTS firewall_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rule_id TEXT NOT NULL UNIQUE,
    action TEXT NOT NULL CHECK(action IN ('Allow', 'Deny', 'Log', 'Drop')),
    protocol TEXT NOT NULL,
    port INTEGER,
    ip_range TEXT,
    description TEXT,
    enabled INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Configuration table
CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_id TEXT NOT NULL UNIQUE,
    alert_type TEXT NOT NULL,
    message TEXT NOT NULL,
    priority INTEGER NOT NULL DEFAULT 1,
    timestamp TEXT NOT NULL DEFAULT (datetime('now')),
    acknowledged INTEGER NOT NULL DEFAULT 0
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_logs_level ON logs(level);
CREATE INDEX IF NOT EXISTS idx_logs_source_ip ON logs(source_ip);
CREATE INDEX IF NOT EXISTS idx_blocked_ips_ip ON blocked_ips(ip);
CREATE INDEX IF NOT EXISTS idx_blocked_ips_active ON blocked_ips(active);
CREATE INDEX IF NOT EXISTS idx_threats_source ON threats(source_ip);
CREATE INDEX IF NOT EXISTS idx_threats_level ON threats(threat_level);
CREATE INDEX IF NOT EXISTS idx_sessions_src_ip ON sessions(src_ip);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update blocked_ips timestamp
CREATE TRIGGER IF NOT EXISTS update_blocked_ts
AFTER UPDATE ON blocked_ips
BEGIN
    UPDATE blocked_ips SET blocked_at = datetime('now') WHERE id = NEW.id;
END;

-- ============================================
-- PROCEDURES (SQLite compatible)
-- ============================================

-- Get active blocked IPs
CREATE VIEW IF NOT EXISTS v_active_blocked_ips AS
SELECT ip, reason, threat_level, blocked_at
FROM blocked_ips
WHERE active = 1;

-- Get recent threats
CREATE VIEW IF NOT EXISTS v_recent_threats AS
SELECT threat_id, source_ip, threat_type, threat_level, detected_at
FROM threats
ORDER BY detected_at DESC
LIMIT 100;

-- ============================================
-- INITIAL DATA
-- ============================================

-- Default configuration values
INSERT OR IGNORE INTO config (key, value) VALUES ('log_level', 'INFO');
INSERT OR IGNORE INTO config (key, value) VALUES ('shield_port', '9876');
INSERT OR IGNORE INTO config (key, value) VALUES ('auto_block', 'true');
INSERT OR IGNORE INTO config (key, value) VALUES ('alert_sound', 'true');
INSERT OR IGNORE INTO config (key, value) VALUES ('max_blocked_ips', '10000');
INSERT OR IGNORE INTO config (key, value) VALUES ('scan_interval_ms', '1000');
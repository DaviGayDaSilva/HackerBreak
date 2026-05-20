//!
//! Hacker Break - Core Security Engine
//! Advanced firewall, anti-intrusion, and network monitoring system
//!
//! This program is free software: you can redistribute it and/or modify
//! it under the terms of the GNU General Public License as published by
//! the Free Software Foundation, either version 3 of the License, or
//! (at your option) any later version.
//!
//! This program is distributed in the hope that it will be useful,
//! but WITHOUT ANY WARRANTY; without even the implied warranty of
//! MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//! GNU General Public License for more details.
//!

use std::collections::HashMap;
use std::sync::{Arc, Mutex};

/// Version
pub const VERSION: &str = "1.0.0";
pub const APP_NAME: &str = "Hacker Break";

/// Threat Level
#[derive(Debug, Clone, PartialEq)]
pub enum ThreatLevel {
    Low,
    Medium,
    High,
    Critical,
}

/// Threat Type
#[derive(Debug, Clone)]
pub enum ThreatType {
    PortScan,
    DDoS,
    BruteForce,
    Malware,
    SuspiciousConnection,
    Unknown,
}

/// Session Status
#[derive(Debug, Clone)]
pub enum SessionStatus {
    Active,
    Suspicious,
    Blocked,
    Terminated,
}

/// Log Level
#[derive(Debug, Clone)]
pub enum LogLevel {
    Debug,
    Info,
    Warning,
    Error,
}

/// Blocked IP
#[derive(Debug, Clone)]
pub struct BlockedIP {
    pub ip: String,
    pub reason: String,
    pub timestamp: u64,
    pub threat_level: ThreatLevel,
}

/// Session
#[derive(Debug, Clone)]
pub struct Session {
    pub id: String,
    pub src_ip: String,
    pub dst_ip: String,
    pub port: u16,
    pub protocol: String,
    pub status: SessionStatus,
    pub start_time: u64,
    pub bytes_in: u64,
    pub bytes_out: u64,
}

/// Threat
#[derive(Debug, Clone)]
pub struct Threat {
    pub id: String,
    pub source_ip: String,
    pub threat_type: ThreatType,
    pub threat_level: ThreatLevel,
    pub timestamp: u64,
    pub description: String,
}

/// Config
#[derive(Debug, Clone)]
pub struct Config {
    pub log_level: LogLevel,
    pub max_blocked_ips: usize,
    pub scan_interval_ms: u64,
    pub auto_block: bool,
    pub shield_port: u16,
}

impl Default for Config {
    fn default() -> Self {
        Self {
            log_level: LogLevel::Info,
            max_blocked_ips: 10000,
            scan_interval_ms: 1000,
            auto_block: true,
            shield_port: 9876,
        }
    }
}

/// AppState
pub struct AppState {
    pub blocked_ips: Arc<Mutex<HashMap<String, BlockedIP>>>,
    pub threats: Arc<Mutex<Vec<Threat>>>,
    pub sessions: Arc<Mutex<HashMap<String, Session>>>,
    pub config: Config,
    pub shield_active: bool,
    pub auto_protection: bool,
    pub blackout_mode: bool,
}

impl Default for AppState {
    fn default() -> Self {
        Self::new()
    }
}

impl AppState {
    pub fn new() -> Self {
        Self {
            blocked_ips: Arc::new(Mutex::new(HashMap::new())),
            threats: Arc::new(Mutex::new(Vec::new())),
            sessions: Arc::new(Mutex::new(HashMap::new())),
            config: Config::default(),
            shield_active: false,
            auto_protection: false,
            blackout_mode: false,
        }
    }
}
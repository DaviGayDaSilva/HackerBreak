//!
//! Hacker Break - Plugin System
//!
//! Sistema de plugins modular para extensões futuras
//!

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::Path;

/// Plugin info
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginInfo {
    pub name: String,
    pub version: String,
    pub author: String,
    pub description: String,
    pub enabled: bool,
}

/// Plugin trait
pub trait Plugin {
    fn info(&self) -> PluginInfo;
    fn init(&mut self) -> Result<(), String>;
    fn shutdown(&mut self) -> Result<(), String>;
}

/// Plugin manager
pub struct PluginManager {
    plugins: HashMap<String, Box<dyn Plugin>>,
}

impl PluginManager {
    pub fn new() -> Self {
        Self {
            plugins: HashMap::new(),
        }
    }

    /// Load plugin from file
    pub fn load_plugin<P: AsRef<Path>>(&mut self, path: P) -> Result<(), String> {
        // Future: Carregar plugins dinamicamente
        Ok(())
    }

    /// Enable plugin
    pub fn enable_plugin(&mut self, name: &str) -> Result<(), String> {
        if let Some(plugin) = self.plugins.get_mut(name) {
            plugin.init()?;
            Ok(())
        } else {
            Err(format!("Plugin not found: {}", name))
        }
    }

    /// Disable plugin
    pub fn disable_plugin(&mut self, name: &str) -> Result<(), String> {
        if let Some(plugin) = self.plugins.get_mut(name) {
            plugin.shutdown()?;
            Ok(())
        } else {
            Err(format!("Plugin not found: {}", name))
        }
    }

    /// List plugins
    pub fn list_plugins(&self) -> Vec<PluginInfo> {
        self.plugins
            .values()
            .map(|p| p.info())
            .collect()
    }
}

impl Default for PluginManager {
    fn default() -> Self {
        Self::new()
    }
}
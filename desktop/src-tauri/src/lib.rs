//!
//! Hacker Break - Tauri Desktop Backend
//!

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

/// Estado da aplicação
struct AppState {
    shield_active: bool,
    auto_protection: bool,
}

/// Resposta de comando
#[derive(Serialize, Deserialize)]
pub struct CommandResult {
    pub success: bool,
    pub message: String,
    pub data: Option<serde_json::Value>,
}

#[tauri::command]
fn get_status(state: tauri::State<'_, Mutex<AppState>> -> CommandResult {
    let app_state = state.lock().unwrap();
    CommandResult {
        success: true,
        message: "Status retrieved".to_string(),
        data: Some(serde_json::json!({
            "shield_active": app_state.shield_active,
            "auto_protection": app_state.auto_protection,
            "version": "1.0.0"
        })),
    }
}

#[tauri::command]
fn enable_shield(state: tauri::State<'_, Mutex<AppState>>) -> CommandResult {
    let mut app_state = state.lock().unwrap();
    app_state.shield_active = true;
    
    println!("🛡️  SHIELD ATIVADO");
    
    CommandResult {
        success: true,
        message: "Shield enabled".to_string(),
        data: None,
    }
}

#[tauri::command]
fn disable_shield(state: tauri::State<'_, Mutex<AppState>>) -> CommandResult {
    let mut app_state = state.lock().unwrap();
    app_state.shield_active = false;
    
    println!("🛡️  SHIELD DESATIVADO");
    
    CommandResult {
        success: true,
        message: "Shield disabled".to_string(),
        data: None,
    }
}

#[tauri::command]
fn block_ip(ip: String, reason: String) -> CommandResult {
    println!("🚫 BLOQUEANDO IP: {} - {}", ip, reason);
    
    CommandResult {
        success: true,
        message: format!("IP {} blocked", ip),
        data: None,
    }
}

#[tauri::command]
fn unblock_ip(ip: String) -> CommandResult {
    println!("✅ DESBLOQUEANDO IP: {}", ip);
    
    CommandResult {
        success: true,
        message: format!("IP {} unblocked", ip),
        data: None,
    }
}

#[tauri::command]
fn get_logs(count: usize) -> CommandResult {
    CommandResult {
        success: true,
        message: "Logs retrieved".to_string(),
        data: Some(serde_json::json!([])),
    }
}

#[tauri::command]
fn get_threats() -> CommandResult {
    CommandResult {
        success: true,
        message: "Threats retrieved".to_string(),
        data: Some(serde_json::json!([
            {
                "id": "1",
                "source_ip": "192.168.1.100",
                "type": "PortScan",
                "level": "High",
                "timestamp": "2024-01-01T00:00:00Z"
            }
        ])),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    env_logger::init();
    
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(Mutex::new(AppState {
            shield_active: false,
            auto_protection: true,
        }))
        .invoke_handler(tauri::generate_handler![
            get_status,
            enable_shield,
            disable_shield,
            block_ip,
            unblock_ip,
            get_logs,
            get_threats,
        ])
        .setup(|app| {
            println!("\n");
            println!("╔════════════════════════════════════════════════════════╗");
            println!("║                                                  ║");
            print!("║  ");
            print_logo_text();
            println!("║");
            println!("║                                                  ║");
            println!("║         CYBER DEFENSE SYSTEM v1.0.0               ║");
            println!("║                                                  ║");
            println!("╚════════════════════════════════════════════════════════╝");
            println!("\n");
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn print_logo_text() {
    let logo = vec![
        r"██████╗ ███████╗██╗      █████╗ ██████╗ ",
        r"██╔══██╗██╔════╝██║     ██╔══██╗██╔══██╗",
        r"██████╔╝█████╗  ██║     ███████║██████╔╝",
        r"██╔══██╗██╔══╝  ██║     ██╔══██║██╔══██╗",
        r"██║  ██║███████╗███████╗██║  ██║██║  ██║",
        r"╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝",
    ];
    
    for line in logo {
        print!("{}", line);
    }
    println!();
}
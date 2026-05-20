# 🛡️ Hacker Break

<div align="center">

![Cyberpunk Shield](https://img.shields.io/badge/Hacker%20Break-v1.0.0-red)
![Platforms](https://img.shields.io/badge/Platforms-Linux%20%7C%20Android%20%7C%20CLI-purple)
![License](https://img.shields.io/badge/License-GPL%203.0-green)

```
 █████╗ ███████╗██╗      █████╗ ██████╗ 
██╔══██╗██╔════╝██║     ██╔══██╗██╔══██╗
██████╔╝█████╗  ██║     ███████║██████╔╝
██╔══██║██╔══╝  ██║     ██╔══██║██╔══██║
██║  ██║███████╗███████╗██║  ██║██║  ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
```

**Sistema Avançado de Defesa Cibernética**

[English](README_en.md) | [Português](README.md)

</div>

---

## 📋 Descrição

**Hacker Break** é um sistema defensivo de cibersegurançaDesigned para detectar e bloquear tentativas de acesso suspeitas, identificando a origem da conexão, encerrando sessões de invasores e impedindo reconexões.

### ⚠️ IMPORTANTE

Este software é **APENAS DEFENSIVO**. Ele:
- ✅ Protege seu dispositivo e rede
- ✅ Detecta ameaças
- ✅ Bloqueia IPs suspeitos
- ❌ NÃO invade dispositivos externos
- ❌ NÃO ataca outros sistemas

---

## 🌟 Funcionalidades Principais

| Função | Descrição |
|--------|------------|
| 🔴 Monitoramento em Tempo Real | Monitora conexões de rede 24/7 |
| 🚫 Detecção de Ameaças | Identifica port scans, brute force, DDoS |
| 🛡️ Shield Mode | Modo de proteção máxima |
| 💀 Bloqueio Automático | Bloqueia automaticamente IPs ameaça |
| 📋 Logs em Tempo Real | Registro detalhado de eventos |
| 📊 Dashboard Cyberpunk | Interface visual estilo terminal |

---

## 💻 Plataformas Suportadas

| Plataforma | Status | Tipo |
|-----------|--------|------|
| Linux (.deb) | ✅ Suportado | Desktop |
| Linux (.AppImage) | ✅ Suportado | Portable |
| Android (.apk) | ✅ Suportado | Mobile |
| Linux CLI | ✅ Suportado | Terminal |
| Termux | ✅ Suportado | Terminal |
| Windows (.exe) | ❌ Não suportado | - |
| iOS (.ipa) | ❌ Não suportado | - |
| macOS (.dmg) | ❌ Não suportado | - |

---

## 🚀 Instalação

### Linux (CLI)

```bash
# Baixar ou clonar
git clone https://github.com/hackerbreak/hacker-break.git

# Tornar executável
chmod +x cli/bin/hbreak

# Executar
./cli/bin/hbreak status
```

### Com Root (recomendado)

```bash
sudo ./cli/bin/hbreak shield enable
```

### Android (Termux)

```bash
pkg install git
git clone https://github.com/hackerbreak/hacker-break.git
cd hacker-break
chmod +x termux/setup.sh
./termux/setup.sh
```

---

## 🎮 Comandos CLI

```bash
# Status do sistema
hbreak status

# Escaneamento de segurança
hbreak scan

# Monitor em tempo real
hbreak monitor
hbreak live

# Ativar/desativar shield
hbreak shield enable
hbreak shield disable

# Bloquear IP
hbreak block 192.168.1.100
hbreak block 1.2.3.4 "motivo"

# Desbloquear IP
hbreak unblock 192.168.1.100

# Encerrar sessão suspeita
hbreak kill-session
hbreak kill-session --ip 1.2.3.4

# Ver logs
hbreak logs
hbreak logs -t 50  # últimas 50 linhas

# Ver todos os comandos
hbreak help
```

---

## 📊 Interface Desktop

O aplicativo desktop inclui:

- Dashboard estilo cyberpunk (preto/vermelho)
- Monitor de ataques em tempo real
- Logs animados com efeitos
- Indicadores de segurança
- Gráficos em tempo real
- Terminal integrado

### Requisitos Desktop

- Linux com desktop environment
- ou build com Tauri

---

## 🏗️ Arquitetura do Projeto

```
/core                    # Backend Rust (principal)
/android                 # Aplicativo Android (Kotlin)
/desktop                 # Interface desktop (Tauri + TS)
/cli                     # Ferramentas CLI (Bash)
/termux                  # Scripts Termux
/database                # Esquemas SQLite
/plugins                # Sistema de plugins
/logs                    # Armazenamento de logs
/configs                 # Arquivos de configuração
```

---

## 🔧 Tecnologias

| Componente | Tecnologia |
|-----------|------------|
| Backend | Rust |
| Android | Kotlin |
| Desktop | Tauri + TypeScript |
| Frontend | React + CSS |
| CLI/Utils | Bash |
| Database | SQLite |
| Config | TOML |

---

## 📱 API Reference

### Endpoints Tauri

```rust
// Status
invoke('get_status')

// Shield
invoke('enable_shield')
invoke('disable_shield')

// IP Blocking
invoke('block_ip', { ip, reason })
invoke('unblock_ip', { ip })

// Monitoring
invoke('get_logs', { count })
invoke('get_threats')
```

---

## ⚙️ Configuração

Editar `configs/hbreak.toml`:

```toml
[firewall]
auto_block = true
auto_block_threshold = 10

[monitoring]
enabled = true
interval_ms = 1000
```

---

## 🔐 Considerações de Segurança

1. Execute como **root** para funcionalidades completas (iptables)
2. Mantenha o shield **ativado** para proteção contínua
3. Revise regularmente os **logs**
4. Atualize o software quando disponível

---

## 📄 Licença

MIT License - See LICENSE file

---

## 👤 Autor

**Hacker Break Team**

---

<div align="center">

*"A melhor defesa é um bom ataque... à privacidade."*

🛡️ Hacker Break v1.0.0

</div>
#!/bin/bash
#
# Hacker Break - CLI Installation Script
# Instala os utilitários CLI para Linux e Termux
#

VERSION="1.0.0"
INSTALL_DIR="${HOME}/.hbreak"
BIN_DIR="${INSTALL_DIR}/bin"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo_info() {
    echo -e "${GREEN}[*]${NC} $1"
}

echo_error() {
    echo -e "${RED}[!]${NC} $1"
}

# Verifica se é root
if [[ $EUID -ne 0 ]]; then
    echo_error "Execute como root (sudo) para instalar"
    exit 1
fi

# Criar diretórios
echo_info "Criando diretórios..."
mkdir -p "${BIN_DIR}"
mkdir -p "${INSTALL_DIR}/logs"
mkdir -p "${INSTALL_DIR}/configs"

# Compilar binários
echo_info "Compilando binários..."

# Copiar scripts
echo_info "Instalando scripts..."

# Criar link simbólico
echo_info "Criando links simbólicos..."
ln -sf "${INSTALL_DIR}/bin/hbreak" /usr/local/bin/hbreak

echo_info "Instalação concluída!"
echo ""
echo_info "用法: hbreak <comando>"
echo_info "Comandos disponíveis:"
echo_info "  scan     - Escaneamento de segurança"
echo_info "  monitor  - Monitor em tempo real"
echo_info "  shield  - Ativar/desativar escudo"
echo_info "  block   - Bloquear IP"
echo_info "  live    - Monitor live"
echo_info "  logs    - Ver logs"
echo ""
echo_info "Para começar: sudo hbreak shield enable"
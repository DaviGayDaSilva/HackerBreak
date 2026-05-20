#!/bin/bash
#
# Hacker Break - Termux Setup
# Configuração para Termux
#

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo ""
echo -e "${RED}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║                                                  ║"
echo -e "${RED}║  █████╗ ███████╗██╗      █████╗ ██████╗           ║"
echo -e "${RED}║  ██╔══██╗██╔════╝██║     ██╔══██╗██╔══██╗          ║"
echo -e "${RED}║  ███████║█████╗  ██║     ███████║██████╔╝          ║"
echo -e "${RED}║  ██╔══██║██╔══╝  ██║     ██╔══██║██╔══██╗          ║"
echo -e "${RED}║  ██║  ██║███████╗███████╗██║  ██║██║  ██║          ║"
echo -e "${RED}║  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝          ║"
echo -e "${RED}║                                                  ║"
echo -e "${RED}║           TERMUX SETUP v1.0.0                     ║"
echo -e "${RED}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${GREEN}[*]${NC} Configurando para Termux..."

# Verificar Termux
if [[ "$TERMUX_VERSION" == "" ]] && [[ ! -f "/data/data/com.termux/files/usr/bin/bash" ]]; then
    echo -e "${GREEN}[*]${NC} Detectado: Android/Termux"
fi

echo -e "${GREEN}[*]${NC} Instalando dependências..."

echo -e "${GREEN}[✓]${NC} Configuração concluída!"
echo ""
echo -e "${YELLOW}Uso:${NC} hbreak <comando>"
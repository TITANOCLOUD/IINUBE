#!/bin/bash
# Script de Actualización IINBUE desde GitHub
# Uso: ./update.sh

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

APP_DIR="/home/iinube/nodeapp"
REPO_URL="https://github.com/IINUBETITANOCLOUD/IINUBE/archive/refs/heads/main.zip"
USERNAME="iinube"

echo -e "${YELLOW}[0/10] Configurando permisos de Git...${NC}"
git config --global --add safe.directory "$APP_DIR"

cd "$APP_DIR"

echo -e "${CYAN}=== Actualizando IINBUE ===${NC}"
echo -e "${CYAN}Hora de inicio: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
echo ""

echo -e "${YELLOW}[1/10] Verificando último commit en GitHub...${NC}"
LATEST_COMMIT=$(curl -s https://api.github.com/repos/IINUBETITANOCLOUD/IINUBE/commits/main | grep -m 1 '"sha"' | cut -d'"' -f4 | cut -c1-7)
COMMIT_MESSAGE=$(curl -s https://api.github.com/repos/IINUBETITANOCLOUD/IINUBE/commits/main | grep -m 1 '"message"' | cut -d'"' -f4)
echo -e "${CYAN}Último commit: ${LATEST_COMMIT} - ${COMMIT_MESSAGE}${NC}"
echo ""

echo -e "${YELLOW}[2/10] Limpiando archivos temporales...${NC}"
rm -f main.zip
rm -rf IINUBE-main

echo -e "${YELLOW}[3/10] Descargando última versión desde GitHub...${NC}"
TIMESTAMP=$(date +%s)
wget -q "${REPO_URL}?t=${TIMESTAMP}" -O main.zip

if [ ! -f main.zip ]; then
    echo -e "${RED}Error: No se pudo descargar el archivo${NC}"
    exit 1
fi

FILE_SIZE=$(ls -lh main.zip | awk '{print $5}')
echo -e "${GREEN}✓ Descargado: ${FILE_SIZE}${NC}"

echo -e "${YELLOW}[4/10] Extrayendo archivos...${NC}"
unzip -oq main.zip

echo -e "${YELLOW}[5/10] Verificando cambios...${NC}"
if [ -d "IINUBE-main" ]; then
    CHANGED_FILES=$(diff -rq IINUBE-main . 2>/dev/null | grep -v "node_modules\|.next\|.git" | wc -l || echo "0")
    echo -e "${CYAN}Archivos modificados: ${CHANGED_FILES}${NC}"
fi

echo -e "${YELLOW}[6/10] Copiando archivos...${NC}"
cp -rf IINUBE-main/* .
cp -rf IINUBE-main/.* . 2>/dev/null || true

rm -rf IINUBE-main main.zip

echo -e "${YELLOW}[7/10] Instalando dependencias...${NC}"
npm install --legacy-peer-deps

echo -e "${YELLOW}[8/10] Compilando proyecto...${NC}"
rm -rf .next
npm run build 2>&1 | tail -20

echo -e "${YELLOW}[9/10] Arreglando permisos...${NC}"
chown -R ${USERNAME}:${USERNAME} "$APP_DIR"
chmod 755 "$APP_DIR"

echo -e "${YELLOW}[10/10] Reiniciando aplicación...${NC}"
mkdir -p tmp
touch tmp/restart.txt

passenger-config restart-app "$APP_DIR" --ignore-app-not-running 2>/dev/null || true
systemctl restart httpd

sleep 2

echo ""
echo -e "${GREEN}✓ Actualización completada exitosamente${NC}"
echo -e "${CYAN}Hora de finalización: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
echo ""
echo -e "${CYAN}=== Información de Despliegue ===${NC}"
echo -e "Commit desplegado: ${LATEST_COMMIT}"
echo -e "Dominio: https://iinube.com"
echo ""
echo -e "${YELLOW}IMPORTANTE:${NC}"
echo -e "1. Limpia la caché del navegador (Ctrl+Shift+R)"
echo -e "2. Prueba en modo incógnito si no ves cambios"
echo -e "3. Espera 10-15 segundos para que Passenger cargue"
echo ""
echo -e "${CYAN}Ver logs:${NC} tail -f /etc/apache2/logs/error_log"
echo ""

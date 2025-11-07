#!/bin/bash
# Script de Actualización Automática desde GitHub con Diagnósticos
# Uso: ./update.sh

set -e  # Salir si hay errores

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

APP_DIR="/home/saturnoocloud/nodeapp"
REPO_URL="https://github.com/TITANOCLOUD/web-carrito-01/archive/refs/heads/main.zip"
USERNAME="saturnoocloud"

cd "$APP_DIR"

echo -e "${CYAN}=== Actualizando Aplicación ===${NC}"
echo -e "${CYAN}Hora de inicio: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
echo ""

echo -e "${YELLOW}[0/9] Verificando último commit en GitHub...${NC}"
LATEST_COMMIT=$(curl -s https://api.github.com/repos/TITANOCLOUD/web-carrito-01/commits/main | grep -m 1 '"sha"' | cut -d'"' -f4 | cut -c1-7)
COMMIT_MESSAGE=$(curl -s https://api.github.com/repos/TITANOCLOUD/web-carrito-01/commits/main | grep -m 1 '"message"' | cut -d'"' -f4)
echo -e "${CYAN}Último commit: ${LATEST_COMMIT} - ${COMMIT_MESSAGE}${NC}"
echo ""

# Limpiar archivos anteriores
echo -e "${YELLOW}[1/9] Limpiando archivos temporales...${NC}"
rm -f main.zip
rm -rf web-carrito-01-main

echo -e "${YELLOW}[2/9] Descargando última versión desde GitHub...${NC}"
TIMESTAMP=$(date +%s)
wget -q "${REPO_URL}?t=${TIMESTAMP}" -O main.zip

if [ ! -f main.zip ]; then
    echo -e "${RED}Error: No se pudo descargar el archivo${NC}"
    exit 1
fi

FILE_SIZE=$(ls -lh main.zip | awk '{print $5}')
echo -e "${GREEN}✓ Descargado: ${FILE_SIZE}${NC}"

# Extraer archivos
echo -e "${YELLOW}[3/9] Extrayendo archivos...${NC}"
unzip -oq main.zip

echo -e "${YELLOW}[4/9] Verificando cambios...${NC}"
if [ -d "web-carrito-01-main" ]; then
    CHANGED_FILES=$(diff -rq web-carrito-01-main . 2>/dev/null | grep -v "node_modules\|.next\|.git" | wc -l || echo "0")
    echo -e "${CYAN}Archivos modificados: ${CHANGED_FILES}${NC}"
fi

# Copiar archivos
echo -e "${YELLOW}[5/9] Copiando archivos al directorio de aplicación...${NC}"
cp -rf web-carrito-01-main/* .
cp -rf web-carrito-01-main/.* . 2>/dev/null || true

# Limpiar archivos temporales
rm -rf web-carrito-01-main main.zip

# Instalar dependencias
echo -e "${YELLOW}[6/9] Instalando dependencias...${NC}"
npm install --legacy-peer-deps

echo -e "${YELLOW}[7/9] Compilando proyecto...${NC}"
rm -rf .next
npm run build 2>&1 | tail -20

# Arreglar permisos
echo -e "${YELLOW}[8/9] Arreglando permisos...${NC}"
chown -R ${USERNAME}:${USERNAME} "$APP_DIR"

echo -e "${YELLOW}[9/9] Reiniciando aplicación...${NC}"
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
echo -e "Dominio: https://saturn-o.cloud"
echo ""
echo -e "${YELLOW}IMPORTANTE:${NC}"
echo -e "1. Limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)"
echo -e "2. Prueba en modo incógnito si no ves cambios"
echo -e "3. Espera 10-15 segundos para que Passenger cargue completamente"
echo ""
echo -e "${CYAN}Ver logs en tiempo real:${NC}"
echo -e "tail -f /etc/apache2/logs/error_log"
echo ""

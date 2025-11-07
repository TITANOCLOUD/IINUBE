#!/bin/bash

echo "🔧 Eliminando carpetas duplicadas..."

# Eliminar carpetas de route groups
rm -rf app/$$admin$$
rm -rf app/$$auth$$
rm -rf app/$$public$$

echo "✅ Carpetas duplicadas eliminadas"

# Limpiar caché de Next.js
echo "🧹 Limpiando caché de Next.js..."
rm -rf .next

echo "✅ Caché limpiado"

echo "📦 Reconstruyendo aplicación..."
npm run build

echo "✅ ¡Listo! La aplicación se ha reconstruido sin errores."

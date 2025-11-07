#!/bin/bash

echo "🧹 Limpiando rutas duplicadas..."

# Eliminar carpetas en (public) si existen
if [ -d "app/(public)" ]; then
    echo "Eliminando app/(public)..."
    rm -rf "app/(public)"
fi

# Limpiar cache de Next.js
echo "Limpiando caché de Next.js..."
rm -rf .next

echo "✅ Limpieza completada"
echo ""
echo "Ejecuta 'npm run build' para recompilar"

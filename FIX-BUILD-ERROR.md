# Solución al Error de Rutas Duplicadas

## El Problema

El error indica que existen páginas duplicadas:
- `app/bare-metal/page.tsx` (versión actual)
- `app/(public)/bare-metal/page.tsx` (versión antigua en el servidor)

## Solución

Ejecuta estos comandos en el servidor:

\`\`\`bash
# 1. Ir al directorio del proyecto
cd /home/saturnoocloud/nodeapp

# 2. Eliminar carpetas duplicadas
rm -rf "app/(public)"

# 3. Limpiar caché
rm -rf .next

# 4. Recompilar
npm run build
\`\`\`

## Alternativa: Usar el script

\`\`\`bash
chmod +x cleanup-duplicates.sh
./cleanup-duplicates.sh
npm run build
\`\`\`

## Verificación

Después de ejecutar los comandos, verifica que solo existan estas rutas:
- `app/bare-metal/page.tsx` ✓
- `app/clusters/page.tsx` ✓
- `app/vps/page.tsx` ✓

Y NO existan estas:
- `app/(public)/bare-metal/page.tsx` ✗
- `app/(public)/clusters/page.tsx` ✗
- `app/(public)/vps/page.tsx` ✗

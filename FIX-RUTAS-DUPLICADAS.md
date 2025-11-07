# Solución para Error de Rutas Duplicadas

## El Error
\`\`\`
You cannot have two parallel pages that resolve to the same path. 
Please check /(admin)/dashboard and /dashboard.
Please check /(auth)/login and /login.
\`\`\`

## Causa
Existen carpetas físicas en el servidor que están causando conflictos:
- `app/(admin)/` 
- `app/(auth)/`
- `app/(public)/`

Estas carpetas fueron creadas en versiones anteriores y deben eliminarse.

## Solución

### Opción 1: Usar el script (Recomendado)
\`\`\`bash
cd /home/saturnoocloud/nodeapp
chmod +x fix-duplicate-routes.sh
./fix-duplicate-routes.sh
\`\`\`

### Opción 2: Comandos manuales
\`\`\`bash
cd /home/saturnoocloud/nodeapp
rm -rf app/$$admin$$
rm -rf app/$$auth$$
rm -rf app/$$public$$
rm -rf .next
npm run build
\`\`\`

### Opción 3: Desde cPanel File Manager
1. Ve a File Manager en cPanel
2. Navega a `/home/saturnoocloud/nodeapp/app/`
3. Elimina las carpetas:
   - `(admin)`
   - `(auth)`
   - `(public)`
4. Regresa al terminal y ejecuta:
   \`\`\`bash
   cd /home/saturnoocloud/nodeapp
   rm -rf .next
   npm run build
   \`\`\`

## Verificación
Después de ejecutar cualquiera de las opciones, verifica que las carpetas se eliminaron:
\`\`\`bash
ls -la app/
\`\`\`

No deberías ver carpetas con paréntesis como `(admin)`, `(auth)` o `(public)`.

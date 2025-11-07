# Solución de Problemas de Deployment IINBUE

## Problemas Resueltos

### 1. Conflicto de Dependencias React 19 vs React 18
**Problema:** `vaul@0.9.9` requiere React 18, pero teníamos React 19
**Solución:** Cambiado a React 18.3.1 en package.json

### 2. Git Ownership Error
**Problema:** `fatal: detected dubious ownership in repository`
**Solución:** Agregado `git config --global --add safe.directory` al inicio del update.sh

### 3. Next.js Config Deprecated
**Problema:** `eslint` configuration ya no es soportada en Next.js 16
**Solución:** Removido `eslint` del next.config.mjs

### 4. Apache Mostrando Directory Listing
**Problema:** El sitio muestra "Index of /" en lugar de la app
**Solución:** Creado/actualizado .htaccess con configuración correcta de Passenger

## Pasos para Corregir el Servidor

### Paso 1: Subir archivos actualizados a GitHub
\`\`\`bash
git add .
git commit -m "Fix deployment issues: React 18, Passenger config, git ownership"
git push origin main
\`\`\`

### Paso 2: En el servidor, ejecutar como root
\`\`\`bash
cd /home/iinube/nodeapp

# Corregir permisos de Git
git config --global --add safe.directory /home/iinube/nodeapp

# Ejecutar update.sh
sh update.sh
\`\`\`

### Paso 3: Verificar que Passenger está activo
\`\`\`bash
passenger-status
\`\`\`

### Paso 4: Verificar logs
\`\`\`bash
tail -f /etc/apache2/logs/error_log
\`\`\`

### Paso 5: Reinicio manual si es necesario
\`\`\`bash
# Limpiar y reinstalar
cd /home/iinube/nodeapp
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build

# Reiniciar servicios
touch tmp/restart.txt
systemctl restart httpd

# Verificar que el puerto 3000 está escuchando
netstat -tulpn | grep 3000
\`\`\`

## Verificación Final

1. Visita https://iinube.com
2. Deberías ver la página de IINBUE, no "Index of /"
3. Si aún ves el listing, verifica:
   - .htaccess existe en /home/iinube/nodeapp
   - server.js existe y es ejecutable
   - Passenger está habilitado en Apache
   - Los permisos son correctos (chown -R iinube:iinube /home/iinube/nodeapp)

## Comandos Útiles

\`\`\`bash
# Ver proceso de Node.js
ps aux | grep node

# Ver configuración de Passenger
passenger-config about

# Reiniciar Apache
systemctl restart httpd

# Ver logs en tiempo real
tail -f /etc/apache2/logs/error_log

# Limpiar todo y empezar de nuevo
cd /home/iinube/nodeapp
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build
touch tmp/restart.txt

# =====================================================
# Script de limpieza - Reorganización de estructura
# Ejecutar desde la raíz del proyecto
# =====================================================

Write-Host "=== Eliminando archivos viejos (reemplazados por nuevas versiones) ===" -ForegroundColor Yellow

# Archivos movidos/renombrados (ya tienen nueva versión)
Remove-Item "lib\mercadopago\mercadopago.ts" -Force -ErrorAction SilentlyContinue
Remove-Item "lib\mercadopago\webhook-signature.ts" -Force -ErrorAction SilentlyContinue
Remove-Item "lib\logger.ts" -Force -ErrorAction SilentlyContinue
Remove-Item "services\membership.ts" -Force -ErrorAction SilentlyContinue
Remove-Item "services\payments.ts" -Force -ErrorAction SilentlyContinue
Remove-Item "services\subscriptions.ts" -Force -ErrorAction SilentlyContinue

# types/supabase/ directorio (archivo movido a types/supabase.ts)
Remove-Item "types\supabase" -Recurse -Force -ErrorAction SilentlyContinue

# supabase/ directorio (schema.sql movido a db/schema.sql)
Remove-Item "supabase" -Recurse -Force -ErrorAction SilentlyContinue

# Auth callback viejo (movido a app/api/auth/route.ts)
Remove-Item "app\auth" -Recurse -Force -ErrorAction SilentlyContinue

# Webhook viejo (movido a app/api/payments/mercadopago/webhook/)
Remove-Item "app\api\webhooks" -Recurse -Force -ErrorAction SilentlyContinue

# API routes vacíos eliminados
Remove-Item "app\api\payments\create-preference" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "app\api\payments\status" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "=== Eliminando carpetas vacías viejas ===" -ForegroundColor Yellow

# Route groups vacíos
Remove-Item "app\(auth)" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "app\(dashboard)" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "app\checkout" -Recurse -Force -ErrorAction SilentlyContinue

# Carpetas vacías
Remove-Item "components" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "hooks" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "tests" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "=== Recreando carpetas vacías para la nueva estructura ===" -ForegroundColor Green

# Components
New-Item -ItemType Directory -Force -Path "components\auth" | Out-Null
New-Item -ItemType Directory -Force -Path "components\dashboard" | Out-Null
New-Item -ItemType Directory -Force -Path "components\shared" | Out-Null
New-Item -ItemType Directory -Force -Path "components\ui" | Out-Null
New-Item -ItemType Directory -Force -Path "components\videos" | Out-Null

# Hooks
New-Item -ItemType Directory -Force -Path "hooks" | Out-Null

# Tests
New-Item -ItemType Directory -Force -Path "tests\e2e" | Out-Null
New-Item -ItemType Directory -Force -Path "tests\integration" | Out-Null
New-Item -ItemType Directory -Force -Path "tests\mocks" | Out-Null
New-Item -ItemType Directory -Force -Path "tests\unit" | Out-Null

# App route groups vacíos
New-Item -ItemType Directory -Force -Path "app\(auth)\login" | Out-Null
New-Item -ItemType Directory -Force -Path "app\(auth)\signup" | Out-Null
New-Item -ItemType Directory -Force -Path "app\(dashboard)\profile" | Out-Null
New-Item -ItemType Directory -Force -Path "app\(dashboard)\raffles" | Out-Null
New-Item -ItemType Directory -Force -Path "app\(dashboard)\referrals" | Out-Null

# Checkout pages
New-Item -ItemType Directory -Force -Path "app\checkout\success" | Out-Null
New-Item -ItemType Directory -Force -Path "app\checkout\failure" | Out-Null
New-Item -ItemType Directory -Force -Path "app\checkout\pending" | Out-Null

Write-Host ""
Write-Host "=== Limpieza completada ===" -ForegroundColor Green
Write-Host "Ahora ejecuta: npx tsc --noEmit" -ForegroundColor Cyan

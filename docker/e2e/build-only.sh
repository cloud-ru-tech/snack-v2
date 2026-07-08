#!/usr/bin/env bash
# Быстрый цикл диагностики: только install + build:packages в Linux-окружении.
# Без chromium, storybook-static и Playwright — чтобы быстро ловить ошибки
# резолва зависимостей/SCSS как на CI, не тратя время на полный e2e-прогон.
#
# Вызывается raw `docker run`-обёрткой (см. README ниже в чате).
# Порядок:
#   1. (опц.) pnpm install --frozen-lockfile
#   2. build:packages (tsc -b → copy icons → cjs-meta → build:css → cjs-css-modules)
#
# Env:
#   BUILD_ONLY_INSTALL=0  — пропустить pnpm install (переиспользовать volume node_modules)
set -euo pipefail

cd /work
export CI=true

# /work — bind-mount с macOS-хоста. packages/*/node_modules приходят с Mac-бинарями и
# ломают Linux-резолв (@ds/*, sass). Прячем их на время install/build, восстанавливаем
# через trap — иначе при падении хостовые node_modules останутся как *.macos-bak.
PKG_NODE_MODULES_BACKUPS=()

hide_macos_package_node_modules() {
  local dir
  while IFS= read -r -d '' dir; do
    if [[ -d "${dir}.macos-bak" ]]; then
      rm -rf "${dir}.macos-bak"
    fi
    mv "${dir}" "${dir}.macos-bak"
    PKG_NODE_MODULES_BACKUPS+=("${dir}")
  done < <(find /work/packages -mindepth 2 -maxdepth 2 -name node_modules -type d -print0 2>/dev/null || true)
  if ((${#PKG_NODE_MODULES_BACKUPS[@]} > 0)); then
    echo "→ hide macOS packages/*/node_modules (${#PKG_NODE_MODULES_BACKUPS[@]} dirs)"
  fi
}

restore_macos_package_node_modules() {
  local dir
  for dir in "${PKG_NODE_MODULES_BACKUPS[@]}"; do
    if [[ -d "${dir}" ]]; then
      rm -rf "${dir}"
    fi
    if [[ -d "${dir}.macos-bak" ]]; then
      mv "${dir}.macos-bak" "${dir}"
    fi
  done
}

trap restore_macos_package_node_modules EXIT

hide_macos_package_node_modules

# Активируем pnpm всегда — даже при BUILD_ONLY_INSTALL=0 дальше нужен `pnpm build:packages`.
corepack enable
corepack prepare pnpm@10.22.0 --activate

if [[ "${BUILD_ONLY_INSTALL:-1}" == "1" ]]; then
  echo '→ pnpm install --frozen-lockfile'
  pnpm install --frozen-lockfile
else
  echo '→ skip pnpm install (BUILD_ONLY_INSTALL=0)'
fi

echo '→ pnpm build:packages'
pnpm build:packages

echo '✓ build:packages OK'

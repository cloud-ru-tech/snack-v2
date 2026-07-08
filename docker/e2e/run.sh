#!/usr/bin/env bash
# E2E / visual regression в Linux-окружении (образ как на CI).
# Вызывается из scripts/docker-e2e.mts.
#
# Порядок:
#   1. pnpm install
#   2. build:packages + build:storybook (Linux static)
#   3. http-server apps/storybook/storybook-static &
#   4. tsx scripts/coverage-serve.mts --wait-only
#   5. playwright test
# Образ: docker/e2e/Dockerfile (bookworm) — OS-deps chromium и сам браузер УЖЕ вшиты,
# поэтому здесь их не ставим (раньше был per-run `playwright install --with-deps chromium`).
set -euo pipefail

cd /work

export CI=true

# macOS packages/*/node_modules приходят с bind-mount, а /work/node_modules — Linux volume.
# tspc резолвит @ds/* через частичный packages/<pkg>/node_modules и не доходит до root volume
# → «Cannot find module @ds/theme / unified / monaco-editor». На CI чистый checkout — там ок.
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
    echo "→ hide macOS packages/*/node_modules (${#PKG_NODE_MODULES_BACKUPS[@]} dirs) for Linux install/build"
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

needs_isolated_node_modules() {
  [[ "${DOCKER_E2E_INSTALL:-1}" == "1" ]] && return 0
  [[ "${DOCKER_E2E_SKIP_STORYBOOK_BUILD:-0}" != "1" ]] && return 0
  return 1
}

cleanup() {
  restore_macos_package_node_modules
  if [[ -n "${STORYBOOK_PID:-}" ]] && kill -0 "${STORYBOOK_PID}" 2>/dev/null; then
    kill "${STORYBOOK_PID}" 2>/dev/null || true
    wait "${STORYBOOK_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT

if needs_isolated_node_modules; then
  hide_macos_package_node_modules
fi

# Активируем pnpm всегда — даже при DOCKER_E2E_INSTALL=0 дальше нужны `pnpm exec` / `pnpm build`.
corepack enable
corepack prepare pnpm@10.22.0 --activate

if [[ "${DOCKER_E2E_INSTALL:-1}" == "1" ]]; then
  echo '→ pnpm install --frozen-lockfile'
  pnpm install --frozen-lockfile
fi

# chromium + его OS-deps (libglib и пр.) вшиты в образ (docker/e2e/Dockerfile) — здесь ничего
# не ставим и не докачиваем. Если образ переопределён на базовый node:slim без браузера —
# верни сюда `pnpm exec playwright install --with-deps chromium`.

STORYBOOK_PORT="${STORYBOOK_PORT:-6006}"
STORYBOOK_URL="http://127.0.0.1:${STORYBOOK_PORT}/"
STATIC_DIR="/work/apps/storybook/storybook-static"

# Static собираем в Linux (не reuse macOS storybook-static с хоста — иначе снова mac↔linux diff).
# Как на CI: сначала packages, потом storybook static.
#   DOCKER_E2E_SKIP_STORYBOOK_BUILD=1 — зонтичный: пропустить и packages, и storybook static.
#   DOCKER_E2E_SKIP_PACKAGES_BUILD=1  — пропустить только build:packages (storybook собирается
#     из исходников через алиасы @ds/* → packages/*/src, поэтому правки сторей видны без dist).
if [[ "${DOCKER_E2E_SKIP_PACKAGES_BUILD:-0}" != "1" && "${DOCKER_E2E_SKIP_STORYBOOK_BUILD:-0}" != "1" ]]; then
  echo '→ pnpm build:packages'
  pnpm build:packages
else
  echo '→ skip build:packages (DOCKER_E2E_SKIP_PACKAGES_BUILD/DOCKER_E2E_SKIP_STORYBOOK_BUILD=1)'
fi

if [[ "${DOCKER_E2E_SKIP_STORYBOOK_BUILD:-0}" != "1" ]]; then
  echo '→ pnpm build:storybook'
  # storybook build идёт с дефолтным heap V8 (~2 ГБ) и падает OOM на большом наборе сторей.
  # Поднимаем лимит только для этого шага (build:ts/css уже пинят 8192 в своих скриптах).
  NODE_OPTIONS=--max-old-space-size=8192 pnpm build:storybook
else
  echo '→ skip build:storybook (DOCKER_E2E_SKIP_STORYBOOK_BUILD=1)'
fi

if [[ ! -f "${STATIC_DIR}/index.json" ]]; then
  echo "Storybook static не найден: ${STATIC_DIR}/index.json" >&2
  echo 'Сборка не удалась. Проверьте лог build:storybook выше.' >&2
  exit 1
fi

echo "→ pnpm dlx http-server ${STATIC_DIR} -p ${STORYBOOK_PORT} -s -c-1"
pnpm dlx http-server "${STATIC_DIR}" -p "${STORYBOOK_PORT}" -s -c-1 &
STORYBOOK_PID=$!

echo '→ pnpm exec tsx scripts/coverage-serve.mts --wait-only'
pnpm exec tsx scripts/coverage-serve.mts --wait-only
echo "→ Storybook static ready at ${STORYBOOK_URL}"

export TEST_LOCAL=true
export SKIP_VISUAL=
export UIKIT_SNACK_URL="${STORYBOOK_URL}"
export STORYBOOK_URL="${STORYBOOK_URL}"
export PW_CI_WORKERS="${PW_CI_WORKERS:-2}"

PLAYWRIGHT_BASE=(test --project=chrome)

normalize_snapshot_args() {
  SNAPSHOT_ARGS=()
  OTHER_ARGS=()
  for arg in "$@"; do
    case "$arg" in
      --update-snapshots)
        SNAPSHOT_ARGS+=(--update-snapshots=all)
        ;;
      --update-snapshots=*)
        SNAPSHOT_ARGS+=("$arg")
        ;;
      *)
        OTHER_ARGS+=("$arg")
        ;;
    esac
  done
}

if [[ "${DOCKER_E2E_MODE:-}" == "visual" ]]; then
  FIND_ROOT="${DOCKER_E2E_VISUAL_PATH:-packages}"
  echo "→ visual specs under ${FIND_ROOT}"
  normalize_snapshot_args "$@"

  mapfile -d '' VISUAL_SPECS < <(find "${FIND_ROOT}" -path '*/__test__/*/visual.spec.ts' -print0)
  if [[ ${#VISUAL_SPECS[@]} -eq 0 ]]; then
    echo "No visual.spec.ts found under ${FIND_ROOT}" >&2
    exit 1
  fi

  echo "→ pnpm exec playwright test --project=chrome (${#VISUAL_SPECS[@]} specs) ${SNAPSHOT_ARGS[*]:-}"
  pnpm exec playwright test --project=chrome "${VISUAL_SPECS[@]}" "${OTHER_ARGS[@]}" "${SNAPSHOT_ARGS[@]}"
else
  echo "→ pnpm exec playwright ${PLAYWRIGHT_BASE[*]} $*"
  pnpm exec playwright "${PLAYWRIGHT_BASE[@]}" "$@"
fi

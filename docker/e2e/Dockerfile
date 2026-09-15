# syntax=docker/dockerfile:1
#
# Образ для e2e / visual-регрессии в Linux — как на CI.
# База — Debian bookworm (паритет по font-rendering с CI-образом, который тоже собран на bookworm);
# НЕ переводить на Ubuntu jammy/noble — другой freetype/fontconfig → сабпиксельный рендер разойдётся, и baseline'ы перестанут совпадать.
#
# Собирается один раз через scripts/docker-e2e.mts (`docker build`), дальше берётся из кэша слоёв
# (повторный build ~1-2 сек, если Dockerfile и build-arg'и не менялись). OS-зависимости chromium (libglib и пр.)
# и сам бинарный файл chromium установлены в образ — во время запуска ничего не скачивается.
#
# PLAYWRIGHT_VERSION передаётся из package.json (@playwright/test) скриптом docker-e2e.mts:
# при обновлении версии build-arg меняется → слой пересобирается → ревизия chromium остаётся синхронной.

ARG NODE_IMAGE=node:24.11.1-bookworm-slim
FROM ${NODE_IMAGE}

ARG PLAYWRIGHT_VERSION=1.59.1
ARG PNPM_VERSION=10.22.0

ENV CI=true

# pnpm через corepack — один раз в образ (в run.sh остаётся дублирующий prepare для других базовых образов).
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# OS-зависимости chromium + бинарный файл chromium под ревизию Playwright. Бинарный файл устанавливается
# в путь по умолчанию (/root/.cache/ms-playwright) слоем образа — поэтому docker-e2e.mts НЕ монтирует browser-volume
# (пустой volume перекрыл бы вшитый браузер). npm-кэш удаляется, чтобы не увеличивать слой.
# Кэширующий MITM-прокси (корпоративный периметр) отдаёт .deb с верным размером, но битым SHA256 —
# apt завершается с ошибкой "Hash Sum mismatch", причём при повторе повреждаются уже другие пакеты.
# No-Cache + BrokenProxy заставляют apt запрашивать пакеты в обход кэша прокси. Без такого прокси
# настройки ни на что не влияют.
RUN printf 'Acquire::http::Pipeline-Depth "0";\nAcquire::http::No-Cache "true";\nAcquire::BrokenProxy "true";\nAcquire::Retries "5";\n' > /etc/apt/apt.conf.d/99fix-broken-proxy

RUN npx --yes playwright@${PLAYWRIGHT_VERSION} install-deps chromium \
  && npx --yes playwright@${PLAYWRIGHT_VERSION} install chromium \
  && rm -rf /root/.npm

WORKDIR /work

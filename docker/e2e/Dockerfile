# syntax=docker/dockerfile:1
#
# Образ для e2e / visual-регрессии в Linux — как на CI.
# База — Debian bookworm (паритет по font-rendering с CI-образом
# clp-docker.pkg.sbercloud.tech/.../bookworm-node-playwright; НЕ переводить на Ubuntu
# jammy/noble — другой freetype/fontconfig → сабпиксельный рендер разойдётся, baseline'ы посыплются).
#
# Собирается один раз через scripts/docker-e2e.mts (`docker build`), дальше берётся из кэша слоёв
# (повторный build ~1-2 сек, если Dockerfile и build-arg'и не менялись). OS-deps chromium (libglib и пр.)
# и сам бинарь chromium вшиты в образ — на рантайме ничего не докачивается.
#
# PLAYWRIGHT_VERSION прокидывается из package.json (@playwright/test) скриптом docker-e2e.mts:
# при bump'е версии build-arg меняется → слой пересобирается → ревизия chromium остаётся синхронной.

ARG NODE_IMAGE=node:24.11.1-bookworm-slim
FROM ${NODE_IMAGE}

ARG PLAYWRIGHT_VERSION=1.59.1
ARG PNPM_VERSION=10.22.0

ENV CI=true

# pnpm через corepack — один раз в образ (в run.sh остаётся дублирующий prepare для не-кастомных баз).
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# OS-зависимости chromium + бинарь chromium под ревизию Playwright. Бинарь ложится в дефолтный
# путь (/root/.cache/ms-playwright) слоем образа — поэтому docker-e2e.mts НЕ монтирует browser-volume
# (пустой volume перекрыл бы вшитый браузер). npm-кэш подчищаем, чтобы не раздувать слой.
RUN npx --yes playwright@${PLAYWRIGHT_VERSION} install-deps chromium \
  && npx --yes playwright@${PLAYWRIGHT_VERSION} install chromium \
  && rm -rf /root/.npm

WORKDIR /work

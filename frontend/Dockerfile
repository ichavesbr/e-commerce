ARG NODE_VERSION=26.8.1-alpine3.24

# ---- Stage de dependências ----
FROM node:${NODE_VERSION} AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund

# ---- Stage de build (standalone) ----
FROM node:${NODE_VERSION} AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Stage de testes ----
FROM builder AS tester
RUN npm test

# ---- Stage final: só o standalone ----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# só necessário se usar next/image com otimização
RUN npm install sharp

RUN mkdir .next \
  && chown node:node .next

# se tiver pasta public/ na raiz do projeto, descomenta:
# COPY --from=builder --chown=node:node /app/public ./public

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]

ARG NODE_VERSION=26.8.1-alpine3.24

# ---- Stage de dependências + build ----
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- Stage de testes ----
FROM builder AS tester
RUN npm test

# ---- Stage final: só prod deps + dist ----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY --from=builder /app/dist ./dist

USER node
EXPOSE 4000
CMD ["node", "dist/index.js"]

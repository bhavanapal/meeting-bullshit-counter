# stage 1 : Install dependencies
FROM node:24-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci


# -------- Stage 2 : Build --------
FROM node:24-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build TypeScript
RUN npm run Build

#-------- Stage 3 : Production -------- 
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=Production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Run as non-root user
USER node

EXPOSE 5000

# Start compiled server
CMD ["node", "dist/server.js"]
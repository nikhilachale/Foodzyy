# Build stage
FROM --platform=linux/amd64 node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY BE/package*.json ./

# Install all dependencies (including dev for build)
RUN npm install

# Copy prisma schema first (for generate)
COPY BE/prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY BE/tsconfig.json ./
COPY BE/src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM --platform=linux/amd64 node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY BE/package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy prisma schema and generate client
COPY BE/prisma ./prisma
RUN npx prisma generate

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["node", "dist/src/index.js"]

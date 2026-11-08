# Official Bun runtime image
FROM oven/bun:1.1-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Expose service port
EXPOSE 4000

# Run the Hono application with Bun
CMD ["bun", "run", "src/index.ts"]

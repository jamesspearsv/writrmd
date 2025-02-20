# Official example: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Use the official Node.js image from Docker Hub
FROM node:22-alpine AS base

# Install dependencies as needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /writrmd

# Copy the pnpm-lock.yaml and package.json and install deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


# Rebuild source only when needed
FROM base as builder
RUN npm install -g pnpm
WORKDIR /writrmd
COPY --from=deps /writrmd/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build


# Final production image
FROM base AS runner
RUN npm install -g pnpm
WORKDIR /writrmd


# Set env vars
ENV NODE_ENV=production
ENV ROOT_PATH='/writrmd'

COPY --from=builder /writrmd/public ./public 

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /writrmd/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /writrmd/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /writrmd/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /writrmd/content /writrmd/content

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
# Use the official Node.js image from Docker Hub
FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /writrmd

# Set root path environmental variable
ENV ROOT_PATH='/writrmd'

# debugging step
RUN echo 'Starting build....'

# Copy the pnpm-lock.yaml and package.json to the container
COPY package.json pnpm-lock.yaml ./

# Install project dependencies using pnpm
RUN pnpm install

# Copy the entire project into the container
COPY . .

# Set environment variables for Next.js (optional but recommended for production)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the Next.js app
RUN pnpm build

# Remove dev dependencies after build step
RUN pnpm prune --prod

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start", "-H", "0.0.0.0", "-p", "3000"]

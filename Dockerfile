# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.12.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ARG PUBLIC_ALGOLIA_API
ARG PUBLIC_ALGOLIA_ID
ARG PUBLIC_FORMSPREE_ID
ARG VITE_ALGOLIA_ID
ARG VITE_ALGOLIA_API
ARG VITE_PUBLIC_DOMAIN
ENV NODE_ENV="production"
ENV PUBLIC_ALGOLIA_API=$PUBLIC_ALGOLIA_API
ENV PUBLIC_ALGOLIA_ID=$PUBLIC_ALGOLIA_ID
ENV PUBLIC_FORMSPREE_ID=$PUBLIC_FORMSPREE_ID
ENV VITE_ALGOLIA_API=$VITE_ALGOLIA_API
ENV VITE_ALGOLIA_ID=$VITE_ALGOLIA_ID
ENV VITE_PUBLIC_DOMAIN=$VITE_PUBLIC_DOMAIN

# Install pnpm
ARG PNPM_VERSION=9.6.0
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY --link . .

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "pnpm", "run", "start" ]

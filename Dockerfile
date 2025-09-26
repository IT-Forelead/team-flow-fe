# Stage 1: Build the application
FROM oven/bun:latest as builder

WORKDIR /app

# Copy dependency files
COPY ./package.json ./
COPY ./bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the app
COPY ./ ./

# Build the app
ARG BUILD_MODE=staging
RUN bun run build --mode $BUILD_MODE

# Stage 2: Serve with NGINX
FROM nginx:1.23-alpine as staging-build

# Clear default HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

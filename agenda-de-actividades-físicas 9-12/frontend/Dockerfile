# Multi-stage Dockerfile for Vite + React (TypeScript) app
FROM node:20-alpine AS build

WORKDIR /app
# copy package metadata and install (dev deps needed for build)
COPY package.json package-lock.json* ./
RUN npm install
RUN npm install @google/generative-ai

# copy source and build
COPY . .
RUN npm run build

# Production image: serve with nginx
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: add a minimal nginx config if you need SPA fallback (uncomment to use)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
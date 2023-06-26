# ---- Base Node ----
FROM node:18.16 AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies  
RUN npm install

# ---- Copy Files/Build ----
FROM dependencies AS build  
WORKDIR /app
COPY . .
RUN npm run build

# --- Release with Alpine ----
FROM node:18.16-alpine AS release  
WORKDIR /app
COPY --from=dependencies /app/package*.json ./
# Install production node modules
RUN npm install --only=production

COPY --from=build /app/dist ./dist

CMD ["npm", "start"]

FROM node:18-alpine
WORKDIR /app

# Copy package files first
COPY package*.json ./
RUN npm install

# Copy all other files
COPY . .

# Verify critical paths
RUN ls -la /usr/local/bin/node && \
  ls -la /app/src/app.js

# Use absolute path to node
CMD ["/usr/local/bin/node", "src/app.js"]
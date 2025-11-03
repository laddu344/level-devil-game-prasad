# Use Node.js 18 base image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files from project root
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app files (everything in project)
COPY . .

# Expose port 3000 for the game server
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]

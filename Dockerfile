# Use Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files to container
COPY . .

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]

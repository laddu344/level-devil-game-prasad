# Use Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]

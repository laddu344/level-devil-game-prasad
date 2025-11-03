# Use Node.js LTS version
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy app files
COPY app/package*.json ./
RUN npm install

# Copy the rest of the app
COPY app .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]

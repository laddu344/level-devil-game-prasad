FROM node:18
WORKDIR /app

# Copy package.json from app folder
COPY app/package*.json ./

RUN npm install

# Copy everything from app folder
COPY app .

EXPOSE 3000
CMD ["node", "server.js"]

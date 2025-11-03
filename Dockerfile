FROM node:18-alpine
WORKDIR /app
COPY level-devil-game/package*.json ./
RUN npm install
COPY level-devil-game/ .
EXPOSE 3000
CMD ["node", "server.js"]

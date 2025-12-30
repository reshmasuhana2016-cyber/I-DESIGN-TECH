✅ FIX #1 (MANDATORY): Create uploads folder inside Docker image
🔧 Update your Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 🔥 CREATE uploads directory
RUN mkdir -p uploads

EXPOSE 5000

CMD ["npm", "start"]
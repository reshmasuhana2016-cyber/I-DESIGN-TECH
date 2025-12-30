
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 🔥 CREATE uploads directory
RUN mkdir -p uploads

EXPOSE 5000

CMD ["npm", "start"]
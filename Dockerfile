FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "export NODE_ENV=production && node ./src/index.js"]

FROM node:16-alpine

RUN apk add --no-cache mysql-client

WORKDIR /app
COPY package*.json ./

COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

RUN npm install
RUN npm install -g nodemon

COPY . .
CMD ["npm", "run","dev"]
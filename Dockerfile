FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run-script build

CMD [ "npm", “run”, "start:prod" ]

EXPOSE 3000

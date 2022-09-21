FROM node:alpine

WORKDIR /server

COPY package.* *.env ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "dist/main"]
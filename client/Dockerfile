FROM node:alpine

WORKDIR /client

COPY package.* *.env ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
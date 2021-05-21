FROM node:lts-alpine

WORKDIR /server

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./tsconfig.json .

CMD ["npm", "run", "start"]

# FROM node:8.12-alpine
FROM entronica/entro-node

WORKDIR /app/mockup

ADD package.json .
ADD . /app/mockup

# RUN npm install sqlite3 --save
RUN npm install

EXPOSE 8989

CMD pm2-runtime pm2-dev.json
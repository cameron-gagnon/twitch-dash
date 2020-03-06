FROM mhart/alpine-node:13 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --production

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]

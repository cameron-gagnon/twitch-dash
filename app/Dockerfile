FROM mhart/alpine-node:13 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --production && \
    yarn cache clean

COPY . .

RUN yarn build

FROM nginx:mainline-alpine

EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

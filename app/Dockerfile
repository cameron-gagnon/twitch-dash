FROM mhart/alpine-node:13 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --production

COPY . .

RUN yarn build

FROM nginx:mainline-alpine

EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

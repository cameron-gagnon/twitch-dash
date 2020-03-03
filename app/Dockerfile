FROM ubuntu:latest

RUN apt -yqq update
RUN apt -yqq install curl gnupg

#RUN curl https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_x86_64 -o /usr/local/bin/dumb-init
#RUN chmod +x /usr/local/bin/dumb-init

#ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt -yqq update

RUN apt -yqq install yarn

WORKDIR /usr/src/twitch-dash

COPY . .

RUN yarn install --pure-lockfile --production
#RUN yarn build

ARG PORT=80
EXPOSE $PORT

#CMD ["serve", "-s", $PORT]
CMD ["yarn", "start"]

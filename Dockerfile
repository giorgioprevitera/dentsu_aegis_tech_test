FROM node:9.9.0-alpine

WORKDIR /usr/src/app

ADD . /usr/src/app

RUN set -ex \
    && npm install

EXPOSE 8080
CMD ["npm", "start"]
USER node

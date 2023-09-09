FROM node:20-alpine

RUN apk update && \
  apk add --upgrade apk-tools && \
  apk upgrade --available && \
  sync

RUN apk --no-cache add openjdk17

RUN npm install -g firebase-tools

WORKDIR /app

CMD [ "firebase", "emulators:start" ]
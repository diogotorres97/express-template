FROM node:11-alpine

RUN mkdir -p /usr/src/app

RUN apk update && apk add python make g++

RUN npm install -g node-gyp

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
FROM node:16-bullseye-slim

ENV DEBIAN_FRONTEND noninteractive
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN apt-get update && \
    apt-get -y install \
    libavutil-dev libavcodec-dev libavformat-dev libavdevice-dev && \
    apt-get -y upgrade && \
    apt-get -y autoremove && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD ./lib/ /app/
ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json

WORKDIR /app/

RUN npm i

ENTRYPOINT ['npm', 'run', 'start']

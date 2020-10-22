FROM ubuntu:18.04

RUN apt update
RUN apt install -y nodejs
RUN apt install -y npm
RUN apt install -y git
RUN apt install -y mongodb

RUN git --version
RUN node --version
RUN npm --version
RUN mongo --version

RUN git clone https://github.com/theteapot/recycle-centre.git

WORKDIR /recycle-centre/server
VOLUME /data/db
RUN npm install
EXPOSE 5142
CMD mongod --fork --syslog && npm start
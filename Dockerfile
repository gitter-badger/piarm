FROM node:onbuild
MAINTAINER Julien Vincent <julienlucvincent@gmail.com>

RUN mkdir -p /data

RUN apt-get update -y && \
    apt-get install -y python

ENTRYPOINT ["python"]
VOLUME ["/data"]
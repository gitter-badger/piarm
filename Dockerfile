FROM debian:jessie
MAINTAINER Julien Vincent <julienlucvincent@gmail.com>

# Create Data folder

RUN mkdir -p /data

# Add new repo containing latest nodejs build

RUN apt-get update -y && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup | bash - && \
    apt-get update -y

# Install Node.js

RUN apt-get install -y nodejs

# Remove curl and clean

RUN apt-get remove --purge -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Default command to run and allow the data folder to be volumed

ENTRYPOINT ["node"]
VOLUME ["/data"]
EXPOSE 80 3000-9000
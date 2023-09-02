FROM node:18-bookworm
# sqlite-vss
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y \
      libgomp1 \
      libatlas-base-dev \
      liblapack-dev \
      sqlite3 \
      libsqlite3-dev \
      libsqlite3-0
# docker-in-docker
# https://github.com/devcontainers/features/issues/573
RUN apt-get install -y pipx && \
    rm /usr/lib/python3.11/EXTERNALLY-MANAGED

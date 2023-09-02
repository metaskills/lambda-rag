FROM node:18-bookworm
COPY --from=ghcr.io/rails-lambda/crypteia-extension-debian:1.1.2 /opt /opt
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter /opt/extensions/lambda-adapter
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
# Lambda Runtime
RUN mkdir -p /var/task && \
    chmod u+rwx /var/task && \
    chown node /var/task
WORKDIR /var/task
ENV LAMBDA_TASK_ROOT=/var/task
# Runtime Code
COPY . .
USER node
CMD ["node", "src/app.js"]

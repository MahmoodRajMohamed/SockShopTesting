FROM selenium/standalone-chrome:latest
WORKDIR /app
COPY . /app
USER root
RUN apt-get update && \
    apt-get install -y nodejs npm
RUN npm install
CMD ["/bin/bash", "-c", "node tests/testing.js"]

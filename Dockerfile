FROM node:19.8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source and compile
COPY . /usr/src/app
RUN ./node_modules/typescript/bin/tsc

# Internal port
EXPOSE 80

# Folder to persist user data (node-persist)
VOLUME ["/usr/src/app/node-persist"]

# To log on external file
VOLUME ["/usr/src/app/logs"]

CMD [ "node", "dist/src/app.js" ]

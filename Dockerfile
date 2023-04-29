FROM node:16-alpine

# create app directory
WORKDIR /usr/scr/app

# install app dependencies
# A wildcare will be used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# install latest node / npm release
RUN apt-get install -y git-core curl build-essential openssl libssl-dev \
 && git clone https://github.com/nodejs/node.git \
 && cd node \
 && ./configure \
 && make \
 && sudo make install

RUN npm install 
# for production use 
# RUN NPM ci --omit=dev
# RUN npm install npm@latest -g && npm install n -g && n latest

RUN ln -s "$(which node)" /usr/bin/node

# bundle app source
COPY . .

# expose port to be used
EXPOSE 8080

# CMD ["which", "node"]
CMD ["npm", "run", "dev"]
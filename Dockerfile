FROM node:latest

# create app directory
WORKDIR /usr/scr/app

# install app dependencies
# A wildcare will be used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# install latest node / npm release
# RUN apk add --update nodejs npm
# RUN apk add --update npm
# RUN apk add nodejs npm

RUN apt-get install git
RUN npm install 
# for production use 
# RUN NPM ci --omit=dev
# RUN npm install npm@latest -g && npm install n -g && n latest
# RUN apk update
# RUN apk add --update nodejs npm

# RUN ln -s "$(which node)" /usr/bin/node

# create directory for drive mnt
RUN mkdir mnt

# create .env file
RUN touch .env

# bundle app source
COPY . .

# expose port to be used
EXPOSE 8080

# CMD ["which", "node"]
CMD ["npm", "run", "dev"]

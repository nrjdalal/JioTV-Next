FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY . .
RUN yarn && yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
FROM node:12.19.0

USER node

WORKDIR /home/node

COPY package.json .

RUN npm install

COPY . ./

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

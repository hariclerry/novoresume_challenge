FROM node:12.19.0

WORKDIR /home/node

COPY package.json .

RUN npm install

ENV PATH=$PATH:/home/node/node_modules/.bin

COPY . ./

# copy html to pdf binaries and make executable
COPY wkhtmltoimage /usr/bin/wkhtmltoimage
COPY wkhtmltopdf /usr/bin/wkhtmltopdf
RUN chmod +x /usr/bin/wkhtmltopdf /usr/bin/wkhtmltoimage

USER node

EXPOSE 5000

ENTRYPOINT [ "nodemon", "app.js" ]

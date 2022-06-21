FROM node:17.7.2

WORKDIR /Server

ENV PORT 8080

COPY package.json /package.json

RUN npm install

RUN npm run build

RUN rm -rf /src
copy . /Server

CMD ["node","src/server.js"]
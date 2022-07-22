FROM node:17.7.2
WORKDIR /zenabyss
ENV PORT 8080
RUN npm shrinkwrap
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
RUN rm -rf ./src
CMD ["node","./server.js"]

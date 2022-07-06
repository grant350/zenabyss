FROM node:17.7.2
WORKDIR /zenabyss
ENV PORT 8080
RUN npm shrinkwrap
COPY *.json .
RUN npm install --production
COPY . .
CMD ["node","./server.js"]

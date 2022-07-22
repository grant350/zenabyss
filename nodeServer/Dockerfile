FROM node:17.7.2
WORKDIR /zenabyss
ENV PORT 8080
RUN npm shrinkwrap
COPY package*.json ./
RUN npm install --production
COPY public ./
RUN npm run build
COPY . .
CMD ["node","./server.js"]

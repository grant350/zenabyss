FROM node:17.7.2

WORKDIR ./zenabyss

ENV PORT 8080
RUN npm shrinkwrap
COPY *.json ./zenabyss
RUN npm install --production
# CMD ['rm','-rf',' /src']
COPY . ./zenabyss


CMD ["node","./server.js"]

FROM node:17.7.2

WORKDIR .

ENV PORT 8080
RUN npm shrinkwrap
COPY *.json .
RUN npm install --production
# CMD ['rm','-rf',' /src']
COPY . .


CMD ["node","server.js"]
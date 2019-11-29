# specify the node base image with your desired version node:<version>
FROM node:13
# replace this with your application's default port
EXPOSE 3000
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]

FROM node:14.18.3 AS build


WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY tsconfig.json ./
RUN npm i
# add app
COPY . ./
# start app
CMD ["npm", "start"]

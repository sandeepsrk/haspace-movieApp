FROM node:14.18.3 AS build


WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*","tsconfig.json", "./"]
RUN npm install --silent
COPY . .
EXPOSE 3000
VOLUME [ "/usr/src/app/node_modules" ]
CMD ["npm", "run", "build"]

FROM node:14.18.3 AS build
WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json
RUN npm install

COPY public/ public
COPY src/ src
RUN npm build

FROM httpd:alpine
WORKDIR /var/www/html
COPY --from=build /build/ .
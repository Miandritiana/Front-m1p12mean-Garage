FROM node:20.18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install -g @angular/cli@18.2.7

RUN npm install --legacy-peer-deps

COPY . .

ENV CONFIGURATION=test

RUN ng build --configuration=${CONFIGURATION}

FROM nginx:latest

COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/back-office-inscription/browser /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

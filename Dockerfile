FROM node:16-alpine as build
WORKDIR /webclient
COPY package*.json ./
RUN npm install npm -g 
RUN npm install react-scripts -g
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /webclient/build /usr/share/nginx/html

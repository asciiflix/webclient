FROM node:16-alpine as build
WORKDIR /webclient
COPY package*.json ./
RUN npm install
RUN npm install react-scripts -g
COPY . ./
RUN npm run build --prod

FROM nginx:stable-alpine
COPY --from=build /webclient/build /usr/share/nginx/html

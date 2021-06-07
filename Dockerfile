FROM node:16-alpine as build
WORKDIR /webclient
ENV PATH /webclient/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install react-scripts@4.0.3 -g
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /webclient/build /usr/share/nginx/html

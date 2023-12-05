# Build stage
FROM node:14 as build

ARG REACT_APP_BACKEND_IP=$REACT_APP_BACKEND_IP

ENV REACT_APP_BACKEND_IP=$REACT_APP_BACKEND_IP

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
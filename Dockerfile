# Stage 1 - Build the ReactJS Application.
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Used tutorial from 2023/02/01 (https://www.knowledgehut.com/blog/web-development/how-to-dockerize-react-app) for this version.
# Stage 2 - Build the NGINX instance and pop the app in here.
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

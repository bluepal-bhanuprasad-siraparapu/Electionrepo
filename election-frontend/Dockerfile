# Frontend Dockerfile - build with create-react-app then serve with nginx
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

FROM nginx:alpine
# Copy nginx default config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM node:24-alpine
WORKDIR /app

RUN echo "=================="
RUN ping -c 10 registry.npmjs.org
RUN echo "=================="

COPY . .

RUN npm install --loglevel silly --force

RUN npm build

EXPOSE 3000

CMD ["node", "dist/index.js"]
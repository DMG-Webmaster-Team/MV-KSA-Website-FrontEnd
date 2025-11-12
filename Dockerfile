FROM node:24-alpine
WORKDIR /app


COPY . .

RUN npm install --loglevel silly --force

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
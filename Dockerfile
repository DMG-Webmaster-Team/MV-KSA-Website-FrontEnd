FROM node:24-alpine
WORKDIR /app


COPY . .

RUN npm install --loglevel silly --force

RUN npm install
RUN npm update
RUN npx next build
RUN npx next start

EXPOSE 3000

CMD ["node", "dist/index.js"]
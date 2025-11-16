FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production=false

COPY . .

ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_FrontEnd_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_FrontEnd_URL=$NEXT_PUBLIC_FrontEnd_URL

RUN npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]

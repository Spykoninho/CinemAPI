FROM node:20.11-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.11-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
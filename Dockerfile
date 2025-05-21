FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm install module-alias

EXPOSE 3000

CMD ["npm", "run", "dev"]
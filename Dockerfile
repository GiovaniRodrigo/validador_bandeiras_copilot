FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Create a non-root user (nodeuser) and home directory
RUN adduser -D -h /home/nodeuser nodeuser

RUN chown -R nodeuser:nodeuser /usr/src/app

USER nodeuser

EXPOSE 3000

CMD ["npm", "run", "dev"]
FROM node:14

WORKDIR /app

COPY package.json yarn.lock src /app/

RUN yarn

RUN yarn next build

EXPOSE 80

ENTRYPOINT ["yarn", "start"]

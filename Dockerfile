FROM node:14-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

ENV PORT=80

COPY . .

RUN yarn build

EXPOSE 80

CMD [ "yarn", "start:prod" ]
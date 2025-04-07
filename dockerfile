FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

EXPOSE 80
EXPOSE 443

CMD [ "node", "index.js" ]
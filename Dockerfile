FROM node:18-alpine@sha256:6e5e1e5e7c0e7e2c1c8a8c5e6e5e1e5e7c0e7e2c1c8a8c5e6e5e1e5e7c0e7e2
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "production"]
#CMD ["npm", "run", "dev"]

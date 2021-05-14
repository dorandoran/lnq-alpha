# Pull base image
FROM node:lts-alpine

# Set working directory
WORKDIR /web

# Install application dependencies
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

# Copy over project files
COPY . .

# Start application
CMD ["yarn", "start"]

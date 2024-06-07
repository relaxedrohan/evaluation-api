# Use Node.js LTS version as base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build TypeScript source code
RUN yarn build

COPY src/scripts/docker-entrypoint.sh /app/src/scripts/docker-entrypoint.sh
RUN chmod +x /app/src/scripts/docker-entrypoint.sh

# Expose the port your app runs on
EXPOSE 3000

CMD ["sh", "/app/src/scripts/docker-entrypoint.sh"]
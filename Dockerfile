# Use Node.js LTS version as base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build TypeScript source code
RUN yarn build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "dev"]

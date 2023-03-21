# Set the base image to the official Node.js 14 image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app3

# Copy the package.json and package-lock.json files to the container
COPY ./package*.json ./

# COPY ./src ./src

# COPY /public ./public

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

EXPOSE 3000:3000

# Set the command to start the application
# CMD ["npm", "start"]
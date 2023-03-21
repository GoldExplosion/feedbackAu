# Set the base image to the official Node.js 14 image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app2

# Copy the package.json and package-lock.json files to the container
COPY ./package*.json ./

# COPY ./server/db.js ./db.js

# COPY ./server/index.js ./index.js

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

EXPOSE 5000:5000

# Set the command to start the application
# CMD ["npm", "run", "dev"]
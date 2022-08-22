# Base image - a light node version
FROM node:18-alpine

# Create a main directory
WORKDIR /frontend

# Copy initialy the dependencies list only, for installation
COPY package.json .

# An action for speeding up npm's command
RUN npm config set registry https://registry.npmjs.org/

# Installation of the required dependencies
RUN npm install

# Copy all code files to the new directory
COPY . .

# Expose the client port
EXPOSE 3000

# Initialize the client
CMD ["npm", "start"]
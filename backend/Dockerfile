# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /code

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY ./server.js /code/

# Make port available to the world outside this container
EXPOSE 6969

# Define environment variable
ENV NODE_ENV=production

# Run the app when the container launches
CMD ["node", "server.js"]

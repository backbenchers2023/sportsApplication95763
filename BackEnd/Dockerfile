# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY SportsApplication/package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY SportsApplication ./

# Expose the port your app runs on
EXPOSE 3000 3050

# Command to run your API server
CMD ["node", "index.js"]
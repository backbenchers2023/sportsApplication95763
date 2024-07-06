# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR C:/Users/mersa/Desktop/Back_end/SportsApplication

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your API server
CMD ["npm start"]

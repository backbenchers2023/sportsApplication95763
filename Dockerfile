# Base image for Flutter
FROM cirrusci/flutter:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the pubspec and pubspec.lock files to the container
COPY live_sr/pubspec.yaml live_sr/pubspec.lock ./

# Get the dependencies
RUN flutter pub get

# Copy the rest of the application code to the container
COPY live_sr/ ./

# Build the Flutter web application
RUN flutter build web

# Use nginx to serve the Flutter web app
FROM nginx:alpine

# Copy the build files to the nginx html directory
COPY --from=0 /app/build/web /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Configure Nginx to listen on port 3000
RUN sed -i 's/listen       80;/listen       3000;/' /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Set the base image to nginx
FROM nginx:1.25.1-alpine

# Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/conf.d

# Set working directory in the container
WORKDIR /usr/share/nginx/html

# Remove the default nginx index page
RUN rm -rf ./*

# Copy configuration files from your local to the nginx directory
COPY ./configs ./

# Expose port 80
EXPOSE 80

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]

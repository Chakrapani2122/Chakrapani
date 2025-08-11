# Use the official nginx image as the base
FROM nginx:alpine

# Maintainer info
LABEL maintainer="Chakrapani Gajji"
LABEL description="Containerized static web application"

# Copy static website files to nginx html directory
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js
COPY assets/ /usr/share/nginx/html/assets/

# Set permissions for web files
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

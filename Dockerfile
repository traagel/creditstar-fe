# Use the Ubuntu-based image from railwayapp as the base
FROM ghcr.io/railwayapp/nixpacks:ubuntu-1693872184

# Set the working directory in the container
WORKDIR /app/

# Update the package list and install required tools
RUN apt-get update && \
    apt-get install -y curl software-properties-common

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Optionally, verify Node and npm installation
RUN node --version
RUN npm --version

# Clean up to reduce the image size
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Nixpacks config
COPY .nixpacks/nixpkgs-c636fe7908e2b52713ff7c260a9da233effc5b7f.nix .nixpacks/nixpkgs-c636fe7908e2b52713ff7c260a9da233effc5b7f.nix

# If you have other Nix related setup, you can include them here
# ...

# Copy app files to the container
COPY . .

# Set NIXPACKS_PATH
ENV NIXPACKS_PATH /app/node_modules/.bin:$NIXPACKS_PATH

# Install app dependencies
RUN --mount=type=cache,id=s/cfaf7ed2-171a-4cf4-8c6a-f175f50a42fd-/root/bun,target=/root/.bun npm ci

# If you have a build step for your app, include it here
RUN npm run build

# Expose the required port (replace 3000 with your app's port if different)
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]

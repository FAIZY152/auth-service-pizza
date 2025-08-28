# Use the official Node.js image as our base
FROM node:18-alpine as builder


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install app dependencies according to the package.json and package-lock file ol version
RUN npm ci

# Copy the rest of our app's source code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 5501

# The command to run our app
RUN npm run build

# Use a smaller image for production
FROM node:18-alpine as production

ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app


COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --ignore-scripts --omit=dev

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./


EXPOSE 5500

CMD [ "node", "dist/index.js" ]
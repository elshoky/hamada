FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Debug step to verify files
#RUN ls -l

# Install dependencies
RUN npm install

# Copy remaining application files
COPY . .

# Expose the application port
EXPOSE 3000

# Set the default command
ENTRYPOINT ["node", "app.js"]


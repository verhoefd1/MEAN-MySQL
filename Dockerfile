#Specifies the image of your engine
FROM node:latest

#The working directory inside your container
WORKDIR /home/app

# Get the package.json first to install dependencies
COPY package*.json ./
# COPY package-lock.json ./

#This will install the dependencies
RUN npm install
#Used for running in automated environments.
# RUN npm ci

#Copy the rest of my code into the working directory
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

#Not sure if this is needed
EXPOSE 8080

# Default command to run when the container is started
CMD ["npm", "run", "dev"]
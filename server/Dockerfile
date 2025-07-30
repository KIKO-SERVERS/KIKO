FROM node:20
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy all source files
COPY . .
RUN apt-get update && apt-get install -y ffmpeg

# Skip TypeScript build and run in dev mode directly
CMD ["npm", "run", "start:dev"]
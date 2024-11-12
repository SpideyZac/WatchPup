# Use the official Bun image
FROM oven/bun:debian

# Set the working directory
WORKDIR /app

# Copy all the application code
COPY . .

# Install dependencies
RUN bun install

# Build the application
RUN bun run build

# Expose the port
EXPOSE 4173

# Command to run your app
CMD ["bun", "run", "preview"]
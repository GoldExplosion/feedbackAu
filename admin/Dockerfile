# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app1

# Copy the current directory contents into the container at /app
COPY . .

# Copy requirements.txt to /app
# COPY requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000 for the application
EXPOSE 5001:5001

# Add a volume for storing application data

# Define environment variable
ENV ENVIRONMENT=production \
    DATABASE_URL=postgresql://postgres:admin@db/testdb

# Run app.py when the container launches

# CMD [ "python", "server.py" ]
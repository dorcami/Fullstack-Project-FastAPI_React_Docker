# Base image - a light python version
FROM python:3.10-alpine

# Create a main directory
WORKDIR /backend

# Copy initialy the dependencies list only, for installation
COPY ./requirements.txt .

# Install the required pip dependencies
RUN pip install -r ./requirements.txt

# Copy all code files to the new directory
COPY . .

# Initialize the server
CMD ["uvicorn", "back:app", "--host", "0.0.0.0", "--port", "8000"]
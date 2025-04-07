# Microservices Architecture

This repository contains a set of microservices designed to demonstrate the use of microservice architecture. Each service is self-contained and can be developed, deployed, and scaled independently. The architecture follows common best practices for building microservices-based applications.

## Project Overview

### The project includes the following services:

- API Gateway: Serves as the entry point for all requests and handles routing, load balancing, and security for the microservices.

- Book Service: Handles book-related data and operations.

- Author Service: Manages author-related data and operations.

- Category Service: Manages categories related to books and authors.

- User Service: Manages user-related data and authentication.

## Technologies Used

#### Loopback4 (TypeScript)

#### API Gateway for routing

#### JWT Authentication and Authorization for user management,

#### MySQL for data storage

# Running the Project

- To run the project locally, follow these steps:

### Clone the repository:

- git clone https://github.com/Sourav-kashyap/Microservices-Architecture.git

- cd Microservices-Architecture

### Install dependencies for each service:

- Navigate to each service folder (e.g., author-services, book-services, etc.) and install dependencies:

- npm install

### Run the Services:

- Navigate to each service folder (e.g., author-services, book-services, etc.) and install dependencies:

- npm start

- This will start the API Gateway at http://localhost:3000.

- This will start the Book Service at http://localhost:3001.

- This will start the Author Service at http://localhost:3002.

- This will start the Category Service at http://localhost:3003.

- This will start the User Service at http://localhost:3004.

## Check Everything is Running:

- Once all services are running, open your browser and navigate to the following URLs to make sure each service is up and running:

- #### API Gateway: http://localhost:3000

- #### Author Service: http://localhost:3002

- #### Book Service: http://localhost:3001

- #### Category Service: http://localhost:3003

- #### User Service: http://localhost:3004

## Troubleshooting:

- If you face issues with the services, check the console logs for any missing dependencies or errors.

- Ensure each service has its own port set correctly, and no two services are conflicting over the same port.

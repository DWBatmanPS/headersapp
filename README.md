# HeaderApp

HeaderApp is a Node.js application that mirrors all request headers sent to it. It is built to be both directly deployed to an environment as well as containerized in Docker to allow for more universal deployment.

## Features

- Mirrors all request headers sent to the application.
- Supports both GET and POST requests.
- Can be deployed directly or as a Docker container.

## Requirements

- Node.js (version 22 or higher)
- Docker (for containerized deployment)

## Installation

### Direct Deployment

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/headerapp.git
   cd headerapp

2. Install dependencies:

   ```sh
   npm install

3. Start the application:

   ```sh
   npm start

4. The application will be running on http://localhost:3000.

### Docker Deployment

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/headerapp.git
   cd headerapp


2. Build the Docker image:

   ```sh
   docker build -t headeapp .
   
3. Run the Docker container:

   ```sh
   docker run -p 3000:3000 headerapp

4. The application will be running on http://localhost:3000

## Usage

Send a GET or POST request to the application, and it will respond with the request headers.

Example:

```sh
curl -X GET http://localhost:3000
```

Response:

```json 
{
  "method": "GET",
  "url": "/",
  "clientIP": "::1",
  "headers": {
    "host": "localhost:3000",
    "user-agent": "curl/7.68.0",
    "accept": "*/*"
  }
}
```

## GutHub Actions

This project uses GitHub Actions to build and push the Docker image to GitHub Container Registry for ease of deployment. The workflow is defined in .github/workflows/build.yml

## Code Disclaimer

This application is a sample application. The sample is provided "as is" without warranty of any kind. This is not intended to be run in any production environment and is intended only as a testing and troubleshooting tool.

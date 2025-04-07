# HeaderApp

HeaderApp is a Node.js application that mirrors all request headers sent to it. It is built to be both directly deployed to an environment as well as containerized in Docker to allow for more universal deployment.

## Features

- Mirrors all request headers sent to the application.
- Supports both GET and POST requests.
- Can be deployed directly or as a Docker container.
- Can support HTTP and HTTPS

## Requirements

- Node.js (version 22 or higher)
- Docker (for containerized deployment)

## Installation

### HTTP Only

#### Direct Deployment

1. Clone the repository:

   ```sh
   git clone https://github.com/Adal8819/headerapp.git
   cd headerapp

2. Install dependencies:

   ```sh
   npm install

3. Start the application:

   ```sh
   npm start

4. The application will be running on [http://localhost:3000](http://localhost:3000).

#### Docker Deployment

1. Clone the repository:

   ```sh
   git clone https://github.com/Adal8819/headerapp.git
   cd headerapp


2. Build the Docker image:

   ```sh
   docker build -t headerapp .
   
3. Run the Docker container:

   ```sh
   docker run -p 3000:3000 headerapp

4. The application will be running on [http://localhost:3000](http://localhost:3000)

### HTTP and HTTPS

#### Direct Deployment with SSL

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/headerapp.git
   cd headerapp

2. Install dependencies:

   ```sh
   npm install

3. Make sure that your SSL Certificates are in place. The application is designed to work with an unencrypted SSL key currently.

4. Update the .ENV file to utilize SSL

   ```text
   SSL_KEY=./ssl/private/leaf.key
   SSL_CERT=./ssl/private/chain.cer
   USESSL=true
   PORTHTTPS=8443
   PORTHTTP=8080
   ```

5. Start the application:

   ```sh
   npm start

6. The application will be running on [http://localhost:8080](http://localhost:8080) and [https://localhost:8443](https://localhost:8443).

#### Docker Deployment with SSL

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/headerapp.git
   cd headerapp

2. Make sure that your SSL Certificates are in place. The application is designed to work with an unencrypted SSL key currently.

3. Update the .ENV file to utilize SSL

   ```text
   SSL_KEY=./etc/ssl/leaf.key
   SSL_CERT=./etc/ssl/chain.cer
   USESSL=true
   PORTHTTPS=8443
   PORTHTTP=8080
   ```

4. Build the Docker image:

   ```sh
   docker build -t headerapp .
   
5. Run the Docker container you need to make sure that you are mounting in the SSL Certificates into the appropriate directory for SSL to function:

   ```sh
   docker run -v 'C:/path/to/your/ssl/files:/etc/ssl/certs' -p 8080:8080 -p 8443:8443 headerapp

6. The application will be running on [http://localhost:8080](http://localhost:8080) and [https://localhost:8443](https://localhost:8443).

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

This project uses GitHub Actions to build and push the Docker image to GitHub Container Registry for ease of deployment. The workflow is defined in .github/workflows/container-build.yml

## Code Disclaimer

This application is a sample application. The sample is provided "as is" without warranty of any kind. This is not intended to be run in any production environment and is intended only as a testing and troubleshooting tool.

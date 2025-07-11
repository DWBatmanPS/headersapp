import dotenv from "dotenv";
import express from "express"
import bodyParser from "body-parser";
import { dirname } from "path"; // this is to handle file path 
import { fileURLToPath } from "url"; // this is to handle file path 
import { url } from "inspector";
import fs from "fs";
import http from "http";
import https from "https";

dotenv.config(); // Load environment variables from .env file

const httpPort = process.env.PORTHTTP || 80; // Default to 80 if PORTHTTP is not set
const httpsPort = process.env.PORTHTTPS || 443; // Default to 443 if PORTHTTPS is not set


const __dirname = dirname(fileURLToPath(import.meta.url)) // this is to handle file path 


const app = express();
//const port = process.env.PORT || 3000;

// My own middleware 
function logger(req, res, next) {
    next()
}

if (process.env.DEBUG === "true") {
    // Log incoming requests
    app.use((req, res, next) => {
        console.log(`Request received: ${req.method} ${req.originalUrl}\n  Client IP: ${req.ip}\n  Headers: ${JSON.stringify(req.headers, null, 2)}`);
        next();
    });
    // Log response status after the response is sent
    app.use((req, res, next) => {
        const originalSend = res.send;
        res.send = function (body) {
            const protocol = req.protocol; // 'http' or 'https'
            console.log(`Response sent for ${protocol.toUpperCase()} request: ${req.method} ${req.originalUrl} with status ${res.statusCode}`);
            originalSend.call(this, body);
        };
        next();
    });
}

// use body parser middleware we can use to mess with the body.
app.use(bodyParser.urlencoded({ extended: true}));

// handling GET /headers request 
app.get("/", (req, res) => {
    res.json({
        method: req.method,
        url: req.originalUrl,
        clientIP: req.ip,
        headers: req.headers
    });
});

// handling POST /headers request
app.post("/", (req, res) => {
    res.json({
        method: req.method,
        url: req.originalUrl,
        clientIP: req.ip,
        headers: req.headers
    });
});

// Create HTTP server
const httpServer = http.createServer(app);

// Create HTTPS server if SSL files are provided
let httpsServer;
if (process.env.SSL_KEY && process.env.SSL_CERT && process.env.USESSL === "true") {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT)
    };
    httpsServer = https.createServer(options, app);
}

// Start HTTP server
httpServer.listen(httpPort, () => {
    console.log(`HTTP server running on port ${httpPort}`);
});

// Start HTTPS server if available
if (httpsServer) {
    httpsServer.listen(httpsPort, () => {
        console.log(`HTTPS server running on port ${httpsPort}`);
    });
}

import dotenv from "dotenv";
import express from "express"
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path"; // this is to handle file path 
import { fileURLToPath } from "url"; // this is to handle file path 
import { url } from "inspector";
import fs from "fs";
import http from "http";
import https from "https";
const __dirname = dirname(fileURLToPath(import.meta.url)) // this is to handle file path 


dotenv.config(); // Load environment variables from .env file

const app = express();
//const port = process.env.PORT || 3000;

// My own middleware 
function logger(req, res, next) {
    next()
}

app.use(logger)

// use body parser middleware we can use to mess with the body.
app.use(bodyParser.urlencoded({ extended: true}));

// using Morgan middleware is a logging middleware
app.use(morgan('combined'))

// Add logging middleware to differentiate HTTP and HTTPS requests
app.use((req, res, next) => {
    const protocol = req.protocol; // 'http' or 'https'
    console.log(`Received a ${protocol.toUpperCase()} request: ${req.method} ${req.originalUrl}`);
    next();
});

// Middleware to log response status after the response is sent
app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        const protocol = req.protocol; // 'http' or 'https'
        console.log(`Response sent for ${protocol.toUpperCase()} request: ${req.method} ${req.originalUrl} with status ${res.statusCode}`);
        originalSend.call(this, body);
    };
    next();
});

// handling GET /headers request 
app.get("/", (req, res) => {
    res.json({
        method: req.method,
        url: req.originalUrl,
        clientIP: req.ip,
        headers: req.headers
    })
})

// handling POST /headers request
app.post("/", (req, res) => {
    res.json({
        method: req.method,
        url: req.originalUrl,
        clientIP: req.ip,
        headers: req.headers
    })
})

// Create HTTP server
const httpServer = http.createServer(app);

// Create HTTPS server if SSL files are provided
let httpsServer;
if (process.env.SSL_KEY && process.env.SSL_CERT && process.env.USESSL == "true") {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT)
    };
    httpsServer = https.createServer(options, app);
}

// Start HTTP server
httpServer.listen(80, () => {
    console.log('HTTP server running on port 80');
});

// Start HTTPS server if available
if (httpsServer) {
    httpsServer.listen(443, () => {
        console.log('HTTPS server running on port 443');
    });
}
//app.listen(port, () => {console.log(`Server running on port ${port}`)})


import express from "express"
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path"; // this is to handle file path 
import { fileURLToPath } from "url"; // this is to handle file path 
import { url } from "inspector";
const __dirname = dirname(fileURLToPath(import.meta.url)) // this is to handle file path 




const app = express();
const port = process.env.PORT || 3000;

// My own middleware 
function logger(req, res, next) {
    next()
}

app.use(logger)

// use body parser middleware we can use to mess with the body.
// app.use(bodyParser.urlencoded({ extended: true}));

// using Morgan middleware is a logging middleware
// app.use(morgan('combined'))

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


app.listen(port, () => {console.log(`Server running on port ${port}`)})

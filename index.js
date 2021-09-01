const http = require("http");
const fs = require("fs");

const submit = require("./lib/submit.js");

const server = http.createServer(function(res, req) {
    let { url, method } = res;
    let pathUrl = url.split("?")[0];
    if(pathUrl[pathUrl.length - 1] === "/") {
        pathUrl += "index.html";
    }
    let query = url.split("?")[1];


    if(
        (pathUrl === "/submit") &&
        (method === "POST")
    ) {
        submit(res, req);
        return;
    }


    fs.readFile(`${__dirname}/htdoc${pathUrl}`, function(err, file) {
        if(err) {
            req.statusCode = 404;
            req.end(file);
            return;
        }
        req.statusCode = 200;
        req.end(file);
    })

    return;
    
});

server.listen(8080);
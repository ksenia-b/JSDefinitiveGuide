// Example: an HTTP serve in Node:
let http = require('http');
let fs = require('fs');

let server = new http.Server();
server.listen(8000);

server.on("request", function(request, response){
    let url = require('url').parse(request.url);
    if(url.pathname === "/test/delay"){
        let delay = parseInt(url.query) || 2000;
        response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
        response.write("Sleep for " + delay + " milliseconds...");
        setTimeout(function(){
            response.write("done. ");
            response.end();
        }, delay);
    }
else if (url.pathname === " /test/mirror"){
    response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
    response.write(request.method + " " + request.url + " HTTP/" + request.httpVersion + "\r\n");
    // request header:
    for(let h in request.headers){
        response.write(h + ": " + request.headers[h] + "\r\n");
    }
    response.write("\r\n");
    requsts.on("data", function(chunk){
        response.write(chunk);    });
    request.on("end", function(chunk){
        response.end();
    });
        
}
else{
    let filename = url.pathname.substring(1);
    let type;
    switch(filename.substring(filename.lastIndexOf(".") + 1)){
        case "html":
            case "htm": type="text/html; charset=UTF-8"; break;
                case "js": type ="application/javascript; charset=UTF-8"; break;
                    case "css": type="text/css; charset=UTF-8"; break;
                    default: type="application/octet-stream"; break;
                
    }
fs.readFile(filename, function(err, content){
    if(err){
        response.writeHead(404, {
            "Content-Type": "text/plain; charset=UTF-8"
        });
        response.writeHead(200, { "Content-Type": type });
        response.write(content);
        response.end();
    }
    else{
        response.writeHead(200, {
            "Content-Type" : type
        });
        response.write(content);
        response.end();
    }
}
);
}});
const os = require('os');
var http = require('http');

function onReq(req, res){
  console.log(`Received request for ${req.url}`);
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write(`Hello World from ${os.hostname()}!`);
  res.end();
}

http.createServer(onReq).listen(8080);
console.log("Server has started.");

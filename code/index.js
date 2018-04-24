const os = require('os');
var http = require('http');

function onReq(req, res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write(`<html><body><h2>Hello World from ${os.hostname()}!</h2></body></html>`);
  res.end();
}

http.createServer(onReq).listen(8080);

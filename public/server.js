/*jshint esversion: 6 */



const http = require('http');

const server = http.createServer ((req,res) => {
 console.log(req.method);
 console.log(req.uri);
 console.log(req.headers.body);
res.writeHead(400,{
  status: "ehel"
});
 res.end('sup dude');
});

server.listen(8181, () => {
  // console.log('req startedon port 3000')
});
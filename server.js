
/*jshint esversion: 6*/
const http = require('http');
const fs = require('fs');
const queryString = require('querystring');

const checkPath = (path) => {
  if (path === '/') {
    path = '/index.html';
  }
  return path;
};

//when notfound is invoked, will respond with 404
const notFound = (res) => {
  // console.log(res);
  fs.readFile(`public/404.html`, (err, data) => {
  res.writeHead(404, {server:"conan o'brien"});
  res.end(data);
  });
};



const writeResponse = (data, res) => {
  res.writeHead(200, {server:"conan o'brien"});
  res.end(data);
};

//
const getMethod = (path, res) => {
  console.log(path);
  fs.readFile(`public${checkPath(path)}`, (err, data) => {
    if (err) return notFound(res);

    return writeResponse(data, res);
  });
};

quack =(req) =>{
  req.on('data', (data)=>{
    let postData = data.toString();
    let parseData = queryString.parse(postData);

    fs.writeFile(`public/${parseData.elementName}.html`,`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${parseData.elementName}.</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${parseData.elementName}.</h1>
  <h2>${parseData.elementSymbol}.</h2>
  <h3>Atomic number ${parseData.elementAtomicNumber}</h3>
  <p>${parseData.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`);
  });
};

const server = http.createServer((req, res) => {
  switch(req.method) {
    case 'GET' :
      getMethod(req.url, res);
      break;
    case 'POST' :
      quack(req);
      break;
    case 'PUT' :
      break;
    case 'DELETE' :
      break;
  }
});

server.listen(8181, () => {
  console.log("Server has started!");
});

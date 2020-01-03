const http = require('http')
const fs = require('fs')
const port = 8080

const server = http.createServer(function(req, res) {
  if(req.url === "/" || req.url === "/index"){
    res.writeHead(200, {'content-type':'text/html'})
    fs.readFile('index.html', function(error, data){
      if (error) {
        res.writeHead(404)
        res.write('Error: File not found')
      } else {
        res.write(data)
      }
      res.end()
    })
  } else {  // static files
    fs.readFile(__dirname + req.url, function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data)
    })
  }
})


server.listen(port, function(error){
  if(error) {
    console.log('OOU', error)
  }else{
    console.log("Server is listening on port: ", + port)
  }
})

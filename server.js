var http  = require('http'),
    url   = require('url'),
    path  = require('path'),
    fs    = require('fs'),
    sys   = require('sys'),
    util  = require('util'),
    moment= require('moment'),
    spawn = require('child_process').spawn;

server = http.createServer(function(request, response){
  
  response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});  
  var body = '';

  request.on('data', function(chunk){
    body += chunk;
  });

  request.on('end', function(){
    var d = new Date();
    var ip = request.connection.remoteAddress;
    df = moment().format("YYYYMMDD")+"_"+moment().format("HHmmss")+"_"+ip;
    json =  df +".json";

    fs.writeFile("/usr0/home/www-data/logs/viz/" + json, body + "\n");
    response.end("http://gauss.modck.cs.cmu.edu/viz/"+json);
    body = '';
  });
  request.resume();
});

server.listen(8081);

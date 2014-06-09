var http  = require('http'),
    url   = require('url'),
    path  = require('path'),
    fs    = require('fs'),
    sys   = require('sys'),
    util  = require('util'),
    spawn = require('child_process').spawn;

server = http.createServer(function(request, response){
  
  response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});  
  var body = '';

  request.on('data', function(chunk){
    body += chunk;
  });

  request.on('end', function(){
    var d = new Date();
    dMonth = d.getMonth()+1;
    dDate = d.getDate();
    dYear = d.getFullYear();
    dHour = ((d.getHours()+1)<12 ? d.getHours() : d.getHours()-12);
    dMinutes = d.getMinutes();
    dSeconds = d.getSeconds();
    dM = ((d.getHours()+1)<12 ? 'AM' : 'PM');
    df = dMonth + '-' + dDate + '-' + dYear +' '+dHour+"-"+dMinutes+'-'+dSeconds + dM;
    json =  "/logs/"+ df +".json";

    fs.writeFile(__dirname + json, body + "\n");
    response.end("http://gauss.modck.cs.cmu.edu/"+json);
    body = '';
  });
  request.resume();
});

server.listen(8081);

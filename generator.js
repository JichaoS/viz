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
  }

  request.on('end', function(){
    var config1 = "var config = {\njsonfile :'";
    var config2 = "',\nanimation_delay : 800,\nwidth : 950,\nheight : 1000,\ninter_chart_margin: 25,\ncontextHeight : 100,\nmargin : {top: 50, right: 40, bottom: 50, left: 60}\n}";


    var d = new Date();
    dMonth = d.getMonth()+1;
    dDate = d.getDate();
    dYear = d.getFullYear();
    dHour = ((d.getHours()+1)<12 ? d.getHours() : d.getHours()-12);
    dMinutes = d.getMinutes();
    dSeconds = d.getSeconds();
    dM = ((d.getHours()+1)<12 ? 'AM' : 'PM');
    df = dMonth + '-' + dDate + '-' + dYear +' '+dHour+"-"+dMinutes+'-'+dSeconds + dM;
    json = "logs/"+ df +".json";
    js = "logs/"+df+".js";

    fs.writeFile(json, body);
    fs.writeFile(js, config1+json+config2);
    response.write('callback(\'{\"msg\":\"' + js + '\"}\')');
  });
  response.end();
});

server.listen(8081);
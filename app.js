var http = require('http');
var exec = require('child_process').exec;
console.log("################################");
const PORT = 7001
  , PATH = '/usr/jenkins/workspace/test'

var deployServer = http.createServer(function(request, response) {
  if (request.url.search(/deploy/i) > 0) {
	
    var commands = [
      'cd ' + PATH,
	  //'git fetch --all',
	  //'git reset --hard origin/master',
      //'git pull '
    ].join(' && ')

    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }
      process.stdout.write(out);
      response.writeHead(200);
      response.end('Deploy Done.'+ showLeftTime())
	console.log("更新完成！ ",request.url);
    })

  } else {

    response.writeHead(404)
    response.end('Not Found.')

  }
})


function showLeftTime()
{
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth() + 1;
	var day=now.getDate();
	var hours=now.getHours();
	var minutes=now.getMinutes();
	var seconds=now.getSeconds();
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds; 

}

deployServer.listen(PORT)
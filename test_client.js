var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  //hostname: 'example.org',
  //path: '/'
  hostname: 'localhost',
  port: 3000,
  path: '/give-me-stuff-now'
  //path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    console.log('got data!');
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log('end!');
    // console.log(str);
  });
}

http.request(options, callback).end();

const http = require('http');
const fs = require('fs');
const url = require('url');
const PORT = process.env.PORT || 3000;


function streamFile(res) {
  fs.createReadStream('./text/life_of_brian.txt').pipe(res);
}

const server = http.createServer((req, res) => {
  const rurl = url.parse(req.url);

  if (rurl.pathname == '/give-me-stuff-now') {
    streamFile(res);
  } else {
    res.write('There can only be one end-point. It is /give-me-stuff-now');
    res.end();
  }

});

server.listen(PORT, function() {
  console.log('Listening on port', PORT);
})

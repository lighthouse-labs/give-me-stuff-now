const http = require('http');
const fs = require('fs');
const url = require('url');
const StreamConcat = require('stream-concat');

const Transform = require('stream').Transform;

const PORT = process.env.PORT || 3000;

// class B extends Reader {
//   _read(size) {
//     crypto.randomBytes(size, (err, buf) {
//       if (err) throw err;
//
//     })
//     //buf.readUInt16BE(0).toString(16)
//   }
// }

class T extends Transform {
  constructor() {
    super();
  }

  _transform(data, enc, next) {
    setTimeout(() => {
      this.push(data);
      next()
    }, 1000);
  }
}

function streamFile(res) {
  res.flushHeaders();
  let scripts = new StreamConcat([
    fs.createReadStream('./text/holy_grail.txt'),
    fs.createReadStream('./text/life_of_brian.txt'),
    fs.createReadStream('./text/meaning_of_life.txt')
  ])
  scripts.pipe(new T(res)).pipe(res);
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

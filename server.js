const http = require('http');
const fs = require('fs');
const url = require('url');
const crypto = require('crypto');

const Transform = require('stream').Transform;
const Reader = require('stream').Reader;

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
  constructor(res) {
    super();
    this.res = res;

  }

  _transform(data, enc, next) {
    console.log('chunk');
    setTimeout(() => {
      this.push(data);
      // this.res.flush()
      next()
    }, 1000);
  }
}

function streamFile(res) {
  res.flushHeaders();
  fs.createReadStream('./text/zeros.txt').pipe(new T(res)).pipe(res);
  // fs.createReadStream('./text/ life_of_brian.txt').pipe(new T(res)).pipe(res);
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

const stream = require('stream');
const fs = require('fs');
const axios = require('axios');
const mime = require('mime');
const express = require('express');
const {
  source, office, html, image, icon,
} = require('./backends');
const logger = require('./logger');
const { PORT } = require('./config');

app = express();
backends = [
  { types: source.types, backend: source },
  { types: office.types, backend: office },
  { types: html.types, backend: html },
  { types: office.image, backend: image },
];

function getBackend(contentType) {
  const found = icon;

  backends.forEach((backend) => {
    if (backend.types.includes(contentType)) {
      found = backend.backend;
    }
  });

  return found;
}

function getContentTypeAndSize(url, args, cb) {
  let contentType;
  let size;

  if (url.startsWith('file://')) {
    contentType = mime.lookup(url);
    fs.stat(url, (e, stats) => {
      if (e) return cb(e);

      size = stats.size;
      cb(e, contentType, size);
    });
  } else {
    axios
      .head(url, { headers: args.headers, cookies: args.cookies })
      .then((r) => {
        contentType = r.headers['content-type'];
        size = parseInt(r.headers['content-length'], 10);
        cb(null, contentType, size);
      })
      .catch(cb);
  }
}

function makeError(e, res) {
  logger.error(e);

  res
    .status(500)
    .end('Internal Server Error');
}

function getParams(req) {
  const contentType = req.headers['content-type'];
  const url = req.params.url;
  let headers = req.params.headers;
  let cookies = req.params.cookies;
  let pages = req.params.pages;

  if (pages) {
    const parts = pages.split('-');
    pages = [parseInt(parts[0], 10)];
    if (parts.length == 2) {
      pages.push(parseInt(parts[1], 10));
    }
  }

  if (headers) {
    headers = JSON.parse(headers);
  }

  if (cookies) {
    cookies = JSON.parse(cookies);
  }

  return { contentType, url, pages, headers, cookies };
}

function makeGetHandler(format) {
  return (req, res) => {
    const { url, pages, headers, cookies } = getParams(req);

    getContentTypeAndSize(url, { headers, cookies }, (e, ct, size) => {
      if (e) {
        return makeError(e, res);
      }
  
      const args = {
        url, pages, headers, cookies, size,
      };
  
      const convertor = getBackend(ct)[`convertTo${format}`];
      convertor(null, args, (e, png) => {
          if (e) {
            return makeError(e, res);
          }
      
          png.pipe(res);  
        });
    });
    };
}

function makePostHandler(format) {
  return (req, res) => {
    const { contentType, pages } = getParams(req);
    const convertor = getBackend(contentType)[`convertTo${format}`];

    convertor(req, { pages }, (e, png) => {
        if (e) {
          return makeError(e, res);
        }
  
        png.pipe(res);
      });  
  };
}

app.get('/', (req, res) => {
  const markup = stream.Readable('<html><body>Hello World!</body></html>');

  html.convertToPdf(markup, {}, (e) => {
    if (e) {
      res
        .status(503)
        .end('ERROR');
      return;
    }

    res.end('OK');
  });
});

app.get('/png/', makeGetHandler('Png'));
app.post('/png/', makePostHandler('Png'));
app.get('/pdf/', makeGetHandler('Pdf'));
app.post('/pdf/', makePostHandler('Pdf'));

function startServer(opts, cb) {
  const port = opts.port || PORT;

  const server = app.listen(port, () => {
    cb(server);
  });

  return server;
}

if (require.main === module) {
  startServer({}, (e, server) => {
    console.log(`Express listening on port ${server.address.port}`);
  });
}

module.exports = {
  startServer,
};

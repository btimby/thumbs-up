const pathlib = require('path');
const axios = require('axios');
const { OFFICER_URL } = require('../config');
const image = require('./image');

function doRequest(path, args) {
  const urlp = new URL(OFFICER_URL);
  const options = {
    method: 'POST',
    hostname: urlp.hostname,
    port: urlp.port,
    path,
    headers: args.headers,
    cookies: args.cookies,
  };

  return http.request(options);
}

function convertToPdf(stream, args, cb) {
  const req = doRequest('/pdf/', args);

  req
    .on('response', (res) => {
      cb(res);
    })
    .pipe(stream);

  return req;
}

function convertToPng(stream, args, cb) {
  const req = doRequest('/pdf/', args);

  req
    .on('response', (res) => {
      image.convertToPng(res, args, cb);
    })
    .pipe(stream);

  return req;
}

module.exports = {
  types: [
    'application/vnd.oasis.opendocument.text',
  ],
  convertToPdf,
  convertToPng,
};

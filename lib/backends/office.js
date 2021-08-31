const urljoin = require('url-join');
const axios = require('axios');
const { OFFICER_URL } = require('../config');
const image = require('./image');

function doRequest(path, stream, args) {
  let req;
  const url = urljoin(OFFICER_URL, path);
  const options = {
    ...args,
  };

  if (stream) {
    req = axios.post(url, stream, options);
  } else {
    req = axios.get(url, options);
  }

  return req;
}

function convertToPdf(stream, args, cb) {
  const req = doRequest('/pdf/', stream, args);

  req
    .then((res) => {
      cb(null, res);
    })
    .catch(cb);

  return req;
}

function convertToPng(stream, args, cb) {
  const req = doRequest('/pdf/', stream, args);

  req
    .then((res) => {
      image.convertToPng(res, args, cb);
    })
    .catch(cb);

  return req;
}

module.exports = {
  types: [
    'application/vnd.oasis.opendocument.text',
  ],
  convertToPdf,
  convertToPng,
};

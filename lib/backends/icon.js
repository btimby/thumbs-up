const sharp = require('sharp');

function convertToPdf(stream, args, cb) {
  // TODO: Create a file type icon.
  const markup = '<html></html>';
  return html.convertToPdf(markup, args, cb);
}

function convertToPng(stream, args, cb) {
  // TODO: create a file type icon.
  const markup = '<html></html>';
  return html.convertToPng(markup, args, cb);
}

module.exports = {
  convertToPdf,
  convertToPng,
};

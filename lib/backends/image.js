const sharp = require('sharp');

function convertToPdf(stream, args, cb) {
  // TODO: render text to HTML via template.
  const markup = '<html></html>';
  return html.convertToPdf(markup, args, cb);
}

function convertToPng(stream, args, cb) {
  // TODO: render text to HTML via template.
  const markup = '<html></html>';
  return html.convertToPng(markup, args, cb);
}

module.exports = {
  types: [
    'image/png', 'image/jpeg',
  ],
  convertToPdf,
  convertToPng,
};

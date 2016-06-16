'use strict';

// Node.js built-ins

var path = require('path');

// 3rd-party modules

var cheerio = require('cheerio');

// local modules

const streamify = require('../utils.js').streamify;

// this module

function transform (opts) {
  var contents = opts.contents;
  var filePath = opts.filePath;

  var $ = cheerio.load(contents);
  if (path.basename(filePath) === 'index.html') {
    $('head > script').last().after('<script>window.BMP.BIC.isBlinkGap = true;</script>');
  }
  return $.html();
}

function htmlInjectBlinkGap (opts) {
  return streamify(opts, transform);
}

module.exports = htmlInjectBlinkGap;
module.exports.transform = transform;

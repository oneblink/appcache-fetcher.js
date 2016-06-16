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
    $('script').first().after(
      '<script src="//Microsoft.Phone.WinJS.2.1/js/base.js"></script>' +
      '<script src="//Microsoft.Phone.WinJS.2.1/js/ui.js"></script>' +
      '<script src="//Microsoft.WinJS.2.1/js/base.js"></script>' +
      '<script src="//Microsoft.WinJS.2.1/js/ui.js"></script>\n'
    );
  }
  return $.html();
}

function htmlInjectWinJs (opts) {
  return streamify(opts, transform);
}

module.exports = htmlInjectWinJs;
module.exports.transform = transform;

/*eslint-disable no-process-exit, no-sync*/ // this is a CLI tool

'use strict';

// Node.js built-ins

var path = require('path');

// 3rd-party modules

var UpstreamFetcher = require('@jokeyrhyme/appcache-fetcher');

// this module

function Fetcher(options) {
  UpstreamFetcher.call(this, options);

  this.addExtractor('manifestUrl', require(path.join(__dirname, 'extractors', 'manifestUrl.dataAttribute')));

  // these are in REVERSE order because they insert before the first SCRIPT
  this.addTransform('html', require(path.join(__dirname, 'transforms', 'html.injectBlinkGap')));
  this.addTransform('html', require(path.join(__dirname, 'transforms', 'html.injectCordova')));
  this.addTransform('html', require(path.join(__dirname, 'transforms', 'html.injectWinJsCompat')));
  this.addTransform('html', require(path.join(__dirname, 'transforms', 'html.injectWinJs')));
}

Fetcher.prototype = Object.create(UpstreamFetcher.prototype, {
  constructor: {
    value: UpstreamFetcher
  }
})

module.exports = Fetcher;

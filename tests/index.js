/*eslint-disable no-sync*/ // tests can be synchronous, relax!

'use strict';

// Node.js built-ins

var path = require('path');

// 3rd-party modules

var test = require('tape');

// our modules

var Fetcher = require(path.join(__dirname, '..', 'lib', 'fetcher'));

// this module

require('tape-chai');

test('Fetcher', function (t) {
  t.isFunction(Fetcher);
  t.end();
});

require(path.join(__dirname, '00_blinkm_co_integration'));

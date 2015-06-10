/*eslint-disable no-sync*/ // tests can be synchronous, relax!

'use strict';

// Node.js built-ins

var path = require('path');

// 3rd-party modules

var AppCache = require('@jokeyrhyme/appcache');

var rimraf = require('rimraf');
var test = require('tape');

// our modules

var Fetcher = require(path.join(__dirname, '..', 'lib', 'fetcher'));

// this module

var OUTPUT_PATH = path.join(__dirname, '..', 'output');
var REMOTE_URL = 'https://blinkm.co/integration';

test(REMOTE_URL, function (t) {
  var fetcher;
  var manifestUrl;
  var appCacheContents;
  var appCache;

  t.test('new Fetcher()...', function (tt) {
    fetcher = new Fetcher({ remoteUrl: REMOTE_URL, localPath: OUTPUT_PATH });
    tt.end();
  });

  t.test('#download() initial HTML', function (tt) {
    rimraf.sync(OUTPUT_PATH);
    tt.plan(1);

    fetcher.afterLocalPath()
    .then(function () {
      return fetcher.download(REMOTE_URL, OUTPUT_PATH);
    })
    .then(function () {
      tt.ok(true);
    }, function (err) {
      tt.error(err);
    });
  });

  t.test('#getManifestURL() resolves with a String', function (tt) {
    fetcher.getManifestURL()
    .then(function (m) {
      manifestUrl = m;
      tt.ok(manifestUrl);
      tt.isString(manifestUrl);
      tt.end();
    }, function (err) {
      tt.error(err);
      tt.end();
    });
  });

  t.test('#download() AppCache Manifest', function (tt) {
    tt.plan(1);

    fetcher.manifestUrl = manifestUrl;
    fetcher.download(manifestUrl, OUTPUT_PATH)
    .then(function () {
      tt.ok(true);
    }, function (err) {
      tt.error(err);
    });
  });

  t.test('#readFile() AppCache Manifest resolves with a String', function (tt) {
    fetcher.readFile(path.join(OUTPUT_PATH, 'appcache.manifest'))
    .then(function (contents) {
      appCacheContents = contents;
      tt.ok(contents);
      tt.isString(contents);
      tt.end();
    }, function (err) {
      tt.error(err);
      tt.end();
    });
  });

  t.test('AppCache.parse() AppCache Manifest', function (tt) {
    appCache = AppCache.parse(appCacheContents);
    tt.isObject(appCache);
    tt.end();
  });

  t.test('#go()...', function (tt) {
    rimraf.sync(OUTPUT_PATH);
    tt.plan(1);

    fetcher.go()
    .then(function () {
      tt.ok(true);
    }, function (err) {
      console.log(err);
      tt.error(err);
    });
  });

  t.end();
});

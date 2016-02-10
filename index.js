/*eslint-disable no-process-exit, no-sync*/ // this is a CLI tool
/* eslint-disable no-console */ // this is a CLI tool

'use strict';

// Node.js built-ins

var fs = require('fs');
var path = require('path');
var url = require('url');

// foreign modules

var Fetcher = require(path.join(__dirname, 'lib', 'fetcher'));

var program = require('commander');
var rimraf = require('rimraf');
var updateNotifier = require('update-notifier');

// local modules

var pkg = require(path.join(__dirname, 'package.json'));

// this module

var fetcher;

var remoteUrl;
var outputPath;

updateNotifier({ pkg }).notify();

program
.version(pkg.version)
.arguments('<url> <output>')
.action(function (rUrl, output) {
  remoteUrl = rUrl;
  outputPath = output;
})
.option('-f, --force', 'wipe `output\' if it already exists, create if needed')
.option('-s, --strict', 'consider fetch errors as fatal')
.parse(process.argv);

(function () {
  var parsed;
  try {
    parsed = url.parse(remoteUrl);
  } catch (ignore) {
    parsed = false;
  }

  if (!parsed || !parsed.protocol || !parsed.host) {
    console.error('error: unable to parse `url\'');
    program.help();
    process.exit(1);
  }
}());

if (fs.existsSync(outputPath)) {
  if (!program.force) {
    console.error('error: `output\' exists: ' + outputPath);
    program.help();
    process.exit(1);
  }

  rimraf.sync(outputPath);
}

fetcher = new Fetcher({
  localPath: outputPath,
  remoteUrl: remoteUrl,
  strictMode: !!program.strict
});

fetcher.go()
.then(function () {
  var input = path.join(__dirname, 'vendor', 'winstore-jscompat.js');
  var output = path.join(outputPath, 'winstore-jscompat.js');
  fs.createReadStream(input)
  .pipe(fs.createWriteStream(output));
});

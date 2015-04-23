/*eslint-disable no-process-exit, no-sync*/ // this is a CLI tool

"use strict";

// Node.js built-ins

var fs = require("fs");
var url = require("url");

// 3rd-party modules

var mkdirp = require("mkdirp");
var program = require("commander");
var rimraf = require("rimraf");

// this module

var pkg = require("./package.json");

var remoteUrl;
var outputPath;

program
.version(pkg.version)
.arguments("<url> <output>")
.action(function (rUrl, output) {
  remoteUrl = rUrl;
  outputPath = output;
})
.option("-f, --force", "wipe `output' if it already exists, create if needed")
.parse(process.argv);

(function () {
  var parsed;
  try {
    parsed = url.parse(remoteUrl);
  } catch (ignore) {
    parsed = false;
  }

  if (!parsed || !parsed.protocol || !parsed.host) {
    console.error("error: unable to parse `url'");
    program.help();
    process.exit(1);
  }
}());

if (fs.existsSync(outputPath)) {
  if (!program.force) {
    console.error("error: `output' exists: " + outputPath);
    program.help();
    process.exit(1);
  }

  rimraf.sync(outputPath);
}

mkdirp.sync(outputPath);

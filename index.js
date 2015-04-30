/*eslint-disable no-process-exit, no-sync*/ // this is a CLI tool

"use strict";

// Node.js built-ins

var fs = require("fs");
var path = require("path");
var url = require("url");

// 3rd-party modules

var Fetcher = require("appcache-fetcher");

var program = require("commander");
var rimraf = require("rimraf");

// this module

var pkg = require("./package.json");

var fetcher;

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

fetcher = new Fetcher({ remoteUrl: remoteUrl, localPath: outputPath });

fetcher.addExtractor("manifestUrl", require("./lib/extractors/manifestUrl.dataAttribute"));

// these are in REVERSE order because they insert before the first SCRIPT
fetcher.addTransform("html", require("./lib/transforms/html.injectBlinkGap"));
fetcher.addTransform("html", require("./lib/transforms/html.injectCordova"));
fetcher.addTransform("html", require("./lib/transforms/html.injectWinJsCompat"));
fetcher.addTransform("html", require("./lib/transforms/html.injectWinJs"));

fetcher.go()
.then(function () {
  var input = path.join(__dirname, "vendor", "winstore-jscompat.js");
  var output = path.join(outputPath, "winstore-jscompat.js");
  fs.createReadStream(input)
  .pipe(fs.createWriteStream(output));
});

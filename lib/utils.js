'use strict';

const through2 = require('through2');

// streamify ({ index: FetcherIndex }, transform: Function) => Stream
function streamify (opts, transform) {
  return through2.obj(
    // (vfile: VinylFile, enc: String, cb: Function)
    (vfile, enc, cb) => {
      var contents = vfile.contents.toString(enc);
      try {
        contents = transform({
          contents: contents,
          fetcher: opts.fetcher,
          filePath: vfile.path,
          index: opts.index
        });
      } catch (err) {
        cb(err);
        return;
      }
      vfile.contents = new Buffer(contents, enc);
      cb(null, vfile);
    }
  );
}

module.exports = { streamify };

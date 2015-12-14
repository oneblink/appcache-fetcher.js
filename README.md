# appcache-fetcher.js

BlinkMobile-specific wrapper for https://github.com/jokeyrhyme/appcache-fetcher.js

[![npm module](https://img.shields.io/npm/v/@blinkmobile/appcache-fetcher.svg)](https://www.npmjs.com/package/@blinkmobile/appcache-fetcher)
[![travis-ci](https://img.shields.io/travis/blinkmobile/appcache-fetcher.js.svg)](https://travis-ci.org/blinkmobile/appcache-fetcher.js)

## usage

```
Usage: appcache-fetcher [options] <url> <output>

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -f, --force    wipe `output' if it already exists, create if needed
  -s, --strict   consider fetch errors as fatal
```

### example

```shell
node path/to/appcache-fetcher.js/ http://devdocs.io/ ~/Desktop/output
```

See the [Cordova how-to guide](docs/howto-cordova.md) for more specific examples.

# appcache-fetcher.js [![AppVeyor Status](https://ci.appveyor.com/api/projects/status/github/blinkmobile/appcache-fetcher.js?branch=master&svg=true)](https://ci.appveyor.com/project/blinkmobile/appcache-fetcher.js) [![Travis CI Status](https://travis-ci.org/blinkmobile/appcache-fetcher.js.svg?branch=master)](https://travis-ci.org/blinkmobile/appcache-fetcher.js)

BlinkMobile-specific wrapper for https://github.com/jokeyrhyme/appcache-fetcher.js


## Installation

```sh
npm install -g @blinkmobile/cli @blinkmobile/appcache-fetcher
```


## Usage

```
Usage: blinkm acf [options] <url> <output>

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -f, --force    wipe `output' if it already exists, create if needed
  -s, --strict   consider fetch errors as fatal
```


### Example

```shell
bm acf https://your.offline.web.app/ path/to/your/project/www
```

See the [Cordova how-to guide](docs/howto-cordova.md) for more specific examples.


## Compatibility

- versions >=2.x require Node.js >=4.x

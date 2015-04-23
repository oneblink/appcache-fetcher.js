# appcache-fetcher.js

BlinkMobile-specific wrapper for https://github.com/jokeyrhyme/appcache-fetcher.js

## usage

```
Usage: appcache-fetcher [options] <url> <output>

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -f, --force    wipe `output' if it already exists, create if needed
```

### example

```shell
node path/to/appcache-fetcher.js/ http://devdocs.io/ ~/Desktop/output
```

# How-To: build a Cordova app

Our current order of priorities for platform support is: Windows, iOS, Android
(in descending order). These instructions will be most successful on higher
priority platforms. Your feedback is greatly appreciated.


## Prerequisites

- [Node.js](https://nodejs.org/) 0.12.x or newer

- NPM 3.0.x or newer (Node.js 5.x includes this)

- latest [Cordova CLI](http://cordova.apache.org/docs/en/5.1.1/guide/cli/index.html#link-2)

- our CLI: https://github.com/blinkmobile/cli

- the CLI for this tool: https://github.com/blinkmobile/appcache-fetcher.js

- basic familiarity with command line interfaces and directory navigation


## 1. Build a standard Cordova project

Follow the [upstream Cordova CLI instructions](http://cordova.apache.org/docs/en/5.1.1/guide/cli/index.html#link-3).

For example (substituting the paths and names):

```shell
cd parent/path/for/your/project
cordova create project-name project.bundle.id

cd path/to/your/project

cordova platform add windows

cordova build windows
cordova emulate windows
```


## 2. Customise the Cordova project

Once you've confirmed that you can build a standard Cordova project, you may
begin customising for your particular solution.

See the following upstream document:

- http://cordova.apache.org/docs/en/5.1.1/config_ref/images.html

Perform a build for your desired target platforms to confirm that these
customisations have not broken anything.

For example (substituting the paths):

```shell
cd path/to/your/project

cordova build windows
cordova emulate windows
```

## 3. (optional) Install extra Cordova plugins

You may find available Cordova plugins by searching [NPM](https://www.npmjs.com/). Search for `cordova-plugin-`.

You may install these plugins using [NPM CLI](https://docs.npmjs.com/cli/install) which is often bundled with Node.js.

For example:

```shell
cd path/to/your/project

npm install --save cordova-plugin-camera
npm install --save cordova-plugin-console
npm install --save cordova-plugin-contacts
npm install --save cordova-plugin-file-transfer
npm install --save cordova-plugin-inappbrowser
npm install --save cordova-plugin-media-capture
```

Perform a build for your desired target platforms to confirm that these plugins
have not broken anything.


## 4. Use this tool to download your offline-capable web app for Cordova

You will need to remove or rename the `www` directory in your Cordova project.

Then, execute the following (substituting the real paths and addresses):

```shell
bm acf https://your.offline.web.app/ path/to/your/project/www
```

This will re-create the `www` directory in your Cordova project, using assets
found by analysing your offline-capable web app.

Perform a build for your desired target platforms to confirm that the new `www`
assets execute as expected.


## 5. (optional) Version your changes

If you are using a version control system, you should version / commit the
following files:

- config.xml
- package.json
- any graphics assets you've added

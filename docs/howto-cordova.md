# How-To: build a Cordova app

Our current order of priorities for platform support is: Windows, iOS, Android
(in descending order). These instructions will be most successful on higher
priority platforms. Your feedback is greatly appreciated.


## Prerequisites

- [Node.js](https://nodejs.org/) 0.12.x or newer

- latest [Cordova CLI](http://cordova.apache.org/docs/en/5.0.0/guide_cli_index.md.html)

- basic familiarity with command line interfaces and directory navigation

- Windows app development requires [VisualStudio](http://visualstudio.com/)
  Express 2013 or Community 2015 or better


## 1. Build a standard Cordova project

Follow the [upstream Cordova CLI instructions](http://cordova.apache.org/docs/en/5.0.0/guide_cli_index.md.html).

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

See the following upstream documents:

- http://cordova.apache.org/docs/en/5.0.0/config_ref_index.md.html

- http://cordova.apache.org/docs/en/5.0.0/config_ref_images.md.html

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


## 4. Download and prepare this tool

You will need a copy of this tool on your local machine. You can download
this from its [GitHub project page](https://github.com/blinkmobile/appcache-fetcher.js).

Once you've downloaded this tool and unpacked it (if necessary), prepare it
for use by executing the following (substituting the real path):

```shell
cd path/to/this/tool
npm install
```

## 5. Use this tool to download your offline-capable web app for Cordova

You will need to remove or rename the `www` directory in your Cordova project.

Then, execute the following (substituting the real paths and addresses):

```shell
node path/to/this/tool https://your.offline.web.app/ path/to/your/project/www
```

This will re-create the `www` directory in your Cordova project, using assets
found by analysing your offline-capable web app.

Perform a build for your desired target platforms to confirm that the new `www`
assets execute as expected.


## 6. (optional) Version your changes

If you are using a version control system, you should version / commit the
following files:

- config.xml
- package.json
- any graphics assets you've added

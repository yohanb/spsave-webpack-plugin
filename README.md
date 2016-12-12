SPSave Webpack Plugin
===================

This is a [webpack](http://webpack.github.io/) plugin that allows you upload generated assets to a SharePoint site. 
This uses the [spsave](https://www.npmjs.com/package/spsave) plugin to authenticate and upload to SharePoint.

Maintainer: Yohan Belval [@yohanb](https://github.com/yohanb)

Installation
------------
Install the plugin with npm:
```shell
$ npm install spsave-webpack-plugin --save-dev
```
 
Basic Usage
-----------

The plugin will generate an HTML5 file for you that includes all your webpack
bundles in the body using `script` tags. Just add the plugin to your webpack
config as follows:

```javascript
var SPSaveWebpackPlugin = require('spave-webpack-plugin');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [new SPSaveWebpackPlugin({
    "coreOptions": {
        "checkin": true,
        "checkinType": 1,
        "siteUrl": "[your sharepoint site URL]"
    },
    "credentialOptions": {
            /* See https://github.com/s-KaiNet/node-sp-auth#params for authentication options */
    },
    "fileOptions": {
        "folder": "Style Library/dist"
    }
})]
};
```

This will upload the `dist/bundle.js` to the specified folder:
![SharePoint library result](https://i.imgur.com/SA72gNH.png =250x)

Configuration
-------------
Since the Webpack plugin is based on the [spsave](https://www.npmjs.com/package/spsave) node module, all configuration options are 
virtually identical. The **only difference** is the fact that you do not need to specify `fileOptions` other that the destination
folder since the uploaded files will be the ones emitted by the Webpack build.
**NOTE:** This plugin is not intented to be used when in a _hot-reloading_ Webpack setup.

# License

This project is licensed under MIT.

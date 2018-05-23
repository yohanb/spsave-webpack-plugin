# SPSave Webpack Plugin [![npm version](https://badge.fury.io/js/spsave-webpack-plugin.svg)](https://badge.fury.io/js/spsave-webpack-plugin)

This is a [webpack](http://webpack.github.io/) plugin that allows you upload generated assets to a SharePoint site.
This uses the [spsave](https://www.npmjs.com/package/spsave) plugin to authenticate and upload to SharePoint.

Maintainers: Yohan Belval [@yohanb](https://github.com/yohanb) and Sergei Sergeev [@s-KaiNet](https://github.com/s-KaiNet)

## Installation

### Important!
The latest version (2.x as of now) of the plugin supports webpack 4.x and doesn't have backward compatibility with webpack 3 or 2.

For webpack, earlier than 4.x version, explicitly use 1.x version:
```shell
$ npm install spsave-webpack-plugin@~1.0.8 --save-dev
```

For webpack 4.x and higher, use regular install:

```shell
$ npm install spsave-webpack-plugin --save-dev
```

## Basic Usage

The plugin will upload all your webpack's assets to SharePoint using [spsave](https://github.com/s-KaiNet/spsave). Just add the plugin to your webpack config as follows:

```javascript
const path = require('path');

const SPSaveWebpackPlugin = require('spsave-webpack-plugin');
const root = path.join.bind(path, path.resolve(__dirname));

const webpackConfig = {
  entry: './index.js',
  output: {
    path: root('dist'),
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
module.exports = webpackConfig;
```

This will upload the `dist/bundle.js` to the specified folder:
![SharePoint library result](https://i.imgur.com/SA72gNH.png=250x)

## Configuration

Since the Webpack plugin is based on the [spsave](https://www.npmjs.com/package/spsave) node module, all configuration options are 
virtually identical. The **only difference** is the fact that you do not need to specify `fileOptions` other that the destination
folder since the uploaded files will be the ones emitted by the Webpack build.
**NOTE:** This plugin is not intended to be used when in a _hot-reloading_ Webpack setup.

## Version History

### Version 2.0

- Webpack 4.0 support (not compatible with older Webpack versions anymore)
- Support for [HTML Webpack Plugin](https://www.npmjs.com/package/html-webpack-plugin)
- Fixed issue with wrong folder structure on SharePoint (flat folder structure instead of intended folder structure)

## License

This project is licensed under MIT.

var path = require('path');
const spsave = require('spsave').spsave;
const utils = require('./lib/utils');

function apply(options, compiler) {

    //Hook into plugins
    compiler.hooks.compilation.tap('spsave-webpack-plugin', function (compilation) {
        // HTML Webpack Plugin support
        if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing != null) {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('spsave-webpack-plugin', function (htmlWebpackCompilation, htmlWebpackCallback) {
                var htmlFile = htmlWebpackCompilation.outputName;
                var htmlFileTargetFolder = utils.getTargetFolder(options.fileOptions.folder, htmlFile);
                var content = htmlWebpackCompilation.html;
                var fileOptions = {
                    folder: htmlFileTargetFolder,
                    fileName: path.basename(htmlFile),
                    fileContent: content
                };
                // console.log(JSON.stringify(fileOptions));
                spsave(options.coreOptions, options.credentialOptions, fileOptions)
                    .then(function () {
                        htmlWebpackCallback();
                    })
                    .catch(function (error) {
                        console.log(error);
                        htmlWebpackCallback();
                    });
            });
        }
    });

    // When assets are being emmited (not yet on file system)
    compiler.hooks.emit.tapAsync('spsave-webpack-plugin', function (compilation, callback) {
        // Build promises and execute all at once
        var assetsFileOptions = utils.getAssetsFileOptions(options.fileOptions.folder, compilation);
        var spSavePromises = assetsFileOptions.map(function (fileOptions) {
            return spsave(options.coreOptions, options.credentialOptions, fileOptions);
        })

        Promise.all(spSavePromises)
            .then(function () {
                callback();
            })
            .catch(function (error) {
                console.log(error);
                callback();
            });
    });

}

function SPSavePlugin(options) {

    // Simple pattern to be able to easily access plugin
    // options when the apply prototype is called
    return {
        apply: apply.bind(this, options)
    };
}

module.exports = SPSavePlugin;
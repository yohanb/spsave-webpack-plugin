var spsave = require('spsave').spsave;

var utils = require('./lib/utils');

function apply(options, compiler) {

    // When assets are being emmited (not yet on file system)
    compiler.hooks.emit.tapAsync('spsave-webpack-plugin', function(compilation, callback) {
        
        // Build promises and execute all at once
        var assetsFileOptions = utils.getAssetsFileOptions(options.fileOptions.folder, compilation);
        var spSavePromises = assetsFileOptions.map(function(fileOptions) {
            return spsave(options.coreOptions, options.credentialOptions, fileOptions);
        })

        Promise.all(spSavePromises)
            .then(function() {
                callback();
            })
            .catch(function(error) {
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
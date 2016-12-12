const path = require('path');
const spsave = require('spsave').spsave;

const utils = require('./lib/utils');

function apply(options, compiler) {

    // When assets are being emmited (not yet on file system)
    compiler.plugin('emit', function (compilation, callback) {
        
        // Build promises and execute all at once
        const assetsFileOptions = utils.getAssetsFileOptions(options.fileOptions.folder, compilation);
        const spSavePromises = assetsFileOptions.map(function(fileOptions) {
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
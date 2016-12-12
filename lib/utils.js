function getAssetsFileOptions(folder, compilation) {
    let fileOptions = [];
    compilation.chunks.forEach(function(chunk) {
        chunk.files.forEach(function(filePath) {
            fileOptions.push({
                folder: path.join(folder, path.dirname(filePath)),
                fileName: path.basename(filePath),
                fileContent: compilation.assets[filePath].source()})
      });
    });

    return fileOptions;
}

module.exports = {
    getAssetsFileOptions
}
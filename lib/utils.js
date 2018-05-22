var path = require('path');

function getAssetsFileOptions(folder, compilation) {
    var fileOptions = [];
    compilation.chunks.forEach(function(chunk) {
		//re-upload only changed files
		if(!chunk.rendered) {
			return;
		}
		
        chunk.files.forEach(function(filePath) {
            var newFolder = path.join(folder, path.dirname(filePath));
			newFolder = newFolder.replace(/\\/g, '/');
            fileOptions.push({
                folder: newFolder,
                fileName: path.basename(filePath),
                fileContent: compilation.assets[filePath].source()})
      });
    });

    return fileOptions;
}

module.exports = {
    getAssetsFileOptions
}
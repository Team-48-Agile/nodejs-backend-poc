const fileReader = require('./fileReader');

const readFromExternalInput = async (fileData, fileType, filePath) => {
    switch (fileType) {
        case '.txt':
            return await fileReader.readText(fileData)

        case '.pdf':
            return await fileReader.readPdf(fileData);

        case '.docx':
            return await fileReader.readDocx(fileData);

        case '.rtf':
            return await fileReader.readRtf(filePath);

        case '.html':
            return await fileReader.readHtml(fileData);

        default:
            throw new Error('Error converting file: ' + fileType + ' not supported');
    }

}

module.exports = {readFromExternalInput};
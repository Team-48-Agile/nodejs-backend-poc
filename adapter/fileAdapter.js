const fileReader = require('./fileReader');
const fileWriter = require('./fileWriter');
const fs = require('fs');

const readFromExternalInput = async (fileData, fileType, filePath) => {
    switch (fileType) {
        case '.txt':
            return await fileReader.readText(fileData)

        case '.pdf':
            return await fileReader.readPdf(fileData);

        case '.docx':
            return await fileReader.readDocx(fileData);

        case '.rtf':
            return await fileReader.readAndCacheRtfContent(filePath);

        case '.html':
            return await fileReader.readHtml(fileData);

        default:
            throw new Error('Error converting file: ' + fileType + ' not supported');
    }
}

const writeToFileSystem = (fileName, fileType, fileData) => {
    switch (fileType) {
        case 'txt':
            return fileWriter.writeTxt(fileName, fileData);

        case 'pdf':
            return fileWriter.writePdf(fileName, fileData)

        case 'docx':
            return fileWriter.writeDocx(fileName, fileData)
                .then(() => { return fileName })
                .catch((err) => console.log(err))

        case 'rtf':
            return fileWriter.writeRtf(fileName, fileData);

            case 'html':
            return fileWriter.writeTxt(fileName, fileData);

        default:
            throw new Error('Error creating  file: '+fileName);
    }
}

module.exports = {readFromExternalInput, writeToFileSystem};
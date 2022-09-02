const fileReader = require('./fileReader');
const fileWriter = require('./fileWriter');

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

const writeToFileSystem = (fileName, fileType, fileData) => {
    switch (fileType) {
        case 'txt':
            fileWriter.writeTxt(fileName, fileData);
            break;

        case 'pdf':
            fileWriter.writePdf(fileName, fileData)
            break;

        case 'docx':
            fileWriter.writeDocx(fileName, fileData)
                .then(() => { console.log('success') })
                .catch((err) => console.log(err))
            break;

        case 'rtf':
            fileWriter.writeRtf(fileName, fileData);
            break;

            case 'html':
            fileWriter.writeTxt(fileName, fileData);
            break;

        default:
            throw new Error('Error creating  file: '+fileName);
    }
}

module.exports = {readFromExternalInput, writeToFileSystem};
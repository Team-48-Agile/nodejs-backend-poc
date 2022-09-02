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
            await fileReader.readAndCacheRtfContent(filePath);

            const text = await _getCachedRtf();
            await _cleanCache();

            return text;

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

const _getCachedRtf = async () => {
    const text = fs.readFileSync(fileReader.CACHED_RTF_LOCATION, 'utf8');
    console.log('CACHE LOCATION: ', fileReader.CACHED_RTF_LOCATION);
    console.log('GET CACHE: ', text);

    return text;
};
const _cleanCache = async () => fs.unlinkSync(fileReader.CACHED_RTF_LOCATION);

module.exports = {readFromExternalInput, writeToFileSystem};
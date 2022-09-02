const fs = require('fs')
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const rtfParser = require('rtf-parser');
const fileWriter = require('./fileWriter');
const { convert } = require('html-to-text');
const fileSystemCache = require('./fileSystemCache');

const readText = async (fileData) => fileData.toString();

const readPdf = async (fileData) => pdf(fileData).then(data => data.text);

const readDocx = async (fileData) => mammoth.extractRawText({buffer: fileData})
    .then(result => result.value);

const readAndCacheRtfContent = async (filePath) => {

    // Problem here: void method, variable textFromRtf is only available for inner scope.
    // also you cant alter variable state inside lambda call, so creating the variable in outer
    // scope and trying to change it doesnt do anything
    await rtfParser.stream(fs.createReadStream(filePath), (err, doc) => {
        var textFromRtf = "";
        for(let i = 0; i < doc.content.length; i++){
            for(let j = 0; j < doc.content[i].content.length; j++){
                textFromRtf += doc.content[i].content[j].value;
            }
            textFromRtf += '\n';
        }
        console.log('PARSED TEXT: ', textFromRtf)


        /*
         To fix the problem above we are converting and then caching the information in a txt file
         so to retrieve it later as a workaround.
        * */
        fileSystemCache.writeCache(textFromRtf)
    });

    const text = await fileSystemCache.getCachedRtf();
    await fileSystemCache.cleanCache();

    return text;
}

const readHtml = async (fileData) => convert(fileData);

module.exports = {readText, readPdf, readDocx, readAndCacheRtfContent, readHtml};
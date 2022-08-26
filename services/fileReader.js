const fs = require('fs')
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const rtfParser = require('rtf-parser');
const { convert } = require('html-to-text');

const readText = async (fileData) => fileData.toString();

const readPdf = async (fileData) => pdf(fileData).then(data => data.text);

const readDocx = async (fileData) => mammoth.extractRawText({buffer: fileData})
    .then(result => result.value);

const readRtf = async (filePath) => {
    console.log('file path:', filePath)

    return rtfParser.stream(fs.createReadStream(filePath), (err, doc) => {
        let textFromRtf = "";

        for(let i = 0; i < doc.content.length; i++){
            for(let j = 0; j < doc.content[i].content.length; j++){
                textFromRtf += doc.content[i].content[j].value;
            }
            textFromRtf += '\n';
        }

        return textFromRtf;
    });
}

const readHtml = async (fileData) => convert(fileData);

module.exports = {readText, readPdf, readDocx, readRtf, readHtml};
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
    var textFromRtf = "";

    rtfParser.stream(fs.createReadStream(filePath), (err, doc) => {

        for(let i = 0; i < doc.content.length; i++){
            for(let j = 0; j < doc.content[i].content.length; j++){
                textFromRtf += doc.content[i].content[j].value;
                // console.log(textFromRtf)
            }
            textFromRtf += '\n';
        }
        return textFromRtf
    });

    return textFromRtf;
}


const readHtml = async (fileData) => convert(fileData);

module.exports = {readText, readPdf, readDocx, readRtf, readHtml};
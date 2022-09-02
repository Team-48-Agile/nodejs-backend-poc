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
    // var textFromRtf = "";

    // Problem here: void method, variable textFromRtf is only available for inner scope.
    // also you cant alter variable state inside lambda call, so creating the variable in outer
    // scope and trying to change it doesnt do anything
    rtfParser.stream(fs.createReadStream(filePath), (err, doc) => {
        var textFromRtf = "";
        for(let i = 0; i < doc.content.length; i++){
            for(let j = 0; j < doc.content[i].content.length; j++){
                textFromRtf += doc.content[i].content[j].value;
            }
            textFromRtf += '\n';
        }
        console.log('PARSED TEXT: ', textFromRtf)
        return textFromRtf
    });

    // return textFromRtf;
}

const readHtml = async (fileData) => convert(fileData);

module.exports = {readText, readPdf, readDocx, readRtf, readHtml};
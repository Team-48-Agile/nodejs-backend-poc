const fs = require('fs');
const HTMLtoDOCX = require('html-to-docx');
const htmlToRtf = require('html-to-rtf');
const html_to_pdf = require('html-pdf-node');
const path = require('path');

const writeTxt = (fileName, fileData) => {
    fs.writeFile(fileName, fileData, (err) => {
        if(err){
            console.error('Error here:'+err);
            return;
        }

        console.log("File written succesfully: ", fileName);
        console.log("File data: ", fileData);
    });

    return path.resolve(fileName)
}

const writeDocx = async (fileName, fileData) => {

    const text = "<p>" + fileData + "</p>";

    const fileBuffer = await HTMLtoDOCX(text);

    fs.writeFile(fileName, fileBuffer, function(err){
        if(err){
            console.error(err);
            return;
        }

        console.log("File written succesfully: ", fileName);
        console.log("File data: ", fileData);
    });
    return path.resolve(fileName)
}

const writeRtf = (fileName, fileData) => {

    const text = "<p>" + fileData + "</p>";

    htmlToRtf.saveRtfInFile(fileName, htmlToRtf.convertHtmlToRtf(text));

    console.log("File written succesfully: ", fileName);
    console.log("File data: ", fileData);

    return path.resolve(fileName);
}

const writePdf = (fileName, fileData) => {
    const test = "<p>" + fileData + "</p>";

    console.log(test);

    let options = {format: 'A4'};
    let file = { content: test};

    return html_to_pdf.generatePdf(file, options)
        .then(pdfBuffer => { fs.writeFile(fileName, pdfBuffer, (err) => {
            if(err){
                console.error(err);
                return;
            }

            console.log("File written succesfully: ", fileName);
            console.log("File data: ", fileData);
        });

            return path.resolve(fileName);
    });
}

module.exports = {writeTxt, writeDocx, writeRtf, writePdf};
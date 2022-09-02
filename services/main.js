const bionicApiClient = require('../client/main.js');
const { textVide } = require('text-vide');
const fileAdapter = require('./fileAdapter');

// Deprecated
//TODO: Remove
const convertText = async (text) => {
    return bionicApiClient.callApiAndConvert(text)
        .then(textWithBionic => {
            console.log("Converted with Bionic Reader API Call")

            return textWithBionic;
        })
        .catch(err => console.error("An error happened when converting the text. Error:", err));
}

const convertTextUsingTextVide = (text, sep, fixationPoints) => {
    const textWithBionic = textVide(text, {sep: sep, fixationPoint: fixationPoints})

    console.log("Converted text with text vide: ", textWithBionic)

    return textWithBionic;
}

const convertFile = async (fileData, fileType, filePath, {sep: sep, fixation: fixation}) => {

    const text = await fileAdapter.readFromExternalInput(fileData, fileType, filePath)

    console.log("Text to be converted with text-vide: ",  text, " with a fixation of: ", fixation);

    const textWithBionic = convertTextUsingTextVide( text, sep, fixation)

    return {text, textWithBionic, fixation};
}

const downloadFile = async (bionicText, filename, fileType) => {
    console.log(bionicText);

    const t = filename + "." + fileType;


    const fs = require('fs');

    fs.open(t, 'w', function(err, file){
        if(err){
            console.error(err);
            return;
        }
        console.log("file created");
    })

    console.log(fileType);

    if(fileType == "txt" || fileType == "html"){

        fs.writeFile(t, bionicText, function(err){
            if(err){
                console.error(err);
                return;
            }
            console.log("text written");
        });
    }
    if(fileType == "docx"){
        const HTMLtoDOCX = require('html-to-docx');

        const test = "<p>" + bionicText + "</p>";
        console.log(test);

        (async() => {
            const fileBuffer = await HTMLtoDOCX(test);

            fs.writeFile(t, fileBuffer, function(err){
                if(err){
                    console.error(err);
                    return;
                }
                console.log("text written");
            });
        })();
    }
    if(fileType == "pdf"){
        const html_to_pdf = require('html-pdf-node');

        const test = "<p>" + bionicText + "</p>";
        console.log(test);

        options = {format: 'A4'};
        file = { content: test};

        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
            fs.writeFile(t, pdfBuffer, function(err){
                if(err){
                    console.error(err);
                    return;
                }
                console.log("text written");
            });
        })
    }
    if(fileType == "rtf"){
        const htmlToRtf = require('html-to-rtf');
        const test = "<p>" + bionicText + "</p>";
        htmlToRtf.saveRtfInFile(t, htmlToRtf.convertHtmlToRtf(test));
    }
}

module.exports = {convertText, convertTextUsingTextVide, convertFile, downloadFile};

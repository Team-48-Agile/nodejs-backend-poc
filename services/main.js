const bionicApiClient = require('../client/main.js');
const { textVide } = require('text-vide');
const fileReader = require('./fileReader');

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
    let textWithBionic;

    switch (fileType) {
        case '.txt':
            const textFromTxt = await fileReader.readText(fileData)
            console.log("Text to be converted with text-vide: ",  textFromTxt, " with a fixation of: ", fixation);
            textWithBionic = convertTextUsingTextVide( textFromTxt, sep, fixation)
            return {text: textFromTxt, textWithBionic, fixation};

        case '.pdf':
            const textFromPdf = await fileReader.readPdf(fileData);
            console.log("Text to be converted with text-vide: ", textFromPdf, " with a fixation of: ", fixation);
            textWithBionic = convertTextUsingTextVide(textFromPdf, sep, fixation)
            return {text: textFromPdf, textWithBionic, fixation};

        case '.docx':
            const textFromDocs = await fileReader.readDocx(fileData);
            console.log("Text to be converted with text-vide: ", textFromDocs, " with a fixation of: ", fixation);
            textWithBionic = convertTextUsingTextVide(textFromDocs, sep, fixation)
            return {text: textFromDocs, textWithBionic, fixation};

        case '.rtf':
            const textFromRtf = await fileReader.readRtf(filePath);
            console.log("Text to be converted with text-vide: ", textFromRtf, " with a fixation of: ", fixation);
            textWithBionic = convertTextUsingTextVide(textFromRtf, sep, fixation)
            return {text: textFromRtf, textWithBionic, fixation};

        case '.html':
            const textFromHtml = await fileReader.readHtml(fileData);
            console.log("Text to be converted with text-vide: ", textFromHtml, " with a fixation of: ", fixation);
            textWithBionic = convertTextUsingTextVide(textFromHtml, sep, fixation)
            return {text: textFromHtml, textWithBionic, fixation};

        default:
            throw new Error('Error converting file: ' + fileType + ' not supported');
    }

}

module.exports = {convertText, convertTextUsingTextVide, convertFile};

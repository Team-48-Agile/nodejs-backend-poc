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

    // TXT files
    if(fileType == '.txt'){
        const textFromTxt = await fileReader.readText(fileData)

        console.log("Text to be converted with text-vide: ",  textFromTxt, " with a fixation of: ", fixation);

        const textWithBionic = convertTextUsingTextVide( textFromTxt, sep, fixation)

        return {text: textFromTxt, textWithBionic, fixation};
    }

    // PDF files
    else if(fileType == '.pdf'){
        const textFromPdf = await fileReader.readPdf(fileData);

        console.log("Text to be converted with text-vide: ", textFromPdf, " with a fixation of: ", fixation);

        const textWithBionic = convertTextUsingTextVide(textFromPdf, sep, fixation)

        return {text: textFromPdf, textWithBionic, fixation};
    }

    // DOCX files
    else if(fileType == '.docx'){
        const textFromDocs = await fileReader.readDocx(fileData);

        console.log("Text to be converted with text-vide: ", textFromDocs, " with a fixation of: ", fixation);

        const textWithBionic = convertTextUsingTextVide(textFromDocs, sep, fixation)

        return {text: textFromDocs, textWithBionic, fixation};
    }

    // RTF files
    else if(fileType == '.rtf'){
        const textFromRtf = await fileReader.readRtf(filePath)
            .catch((err) => {
               console.log(err);
            });

        console.log("Text to be converted with text-vide: ", textFromRtf, " with a fixation of: ", fixation);

        const textWithBionic = convertTextUsingTextVide(textFromRtf, sep, fixation)

        return {text: textFromRtf, textWithBionic, fixation};
    }

    // HTML files
    else if(fileType == '.html'){

        const text = await fileReader.readHtml(fileData);

        console.log("Text to be converted with text-vide: ", text, " with a fixation of: ", fixation);

        const textWithBionic = convertTextUsingTextVide(text, sep, fixation)

        return {text, textWithBionic, fixation};
    }

    else{
        console.error(fileType + " is not supported!");
    }
}

module.exports = {convertText, convertTextUsingTextVide, convertFile};

const bionicApiClient = require('../client/main.js');
const { textVide } = require('text-vide');
const fileAdapter = require('../adapter/fileAdapter');
const fs = require('fs');

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
    const file = filename + Math.random() + "." + fileType;

    const filePath = fileAdapter.writeToFileSystem(file, fileType, bionicText)

    console.log('File path to be downloaded: '+filePath);

    return filePath;
}

module.exports = {convertText, convertTextUsingTextVide, convertFile, downloadFile};

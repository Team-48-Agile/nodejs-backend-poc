const bionicApiClient = require('../client/main.js');
const { textVide } = require('text-vide');

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

module.exports = {convertText, convertTextUsingTextVide};

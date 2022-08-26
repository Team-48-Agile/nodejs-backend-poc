const bionicApiClient = require('../client/main.js');
const { textVide } = require('text-vide');

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

const convertFile = async (fileData, fileType, {sep: sep, fixation: fixation}) => {

    // TXT files
    if(fileType == '.txt'){
        var text = fileData.toString();


        console.log("Text to be converted with text-vide: ", text, " with a fixation of: ", fixation);
        const textWithBionic = convertTextUsingTextVide(text, sep, fixation)

        return {text, textWithBionic, fixation};
    }

    // PDF files
    else if(fileType == '.pdf'){
        const pdf = require('pdf-parse');

        pdf(fileData).then(function(data){
            var text = data.text;

            console.log("Text to be converted with text-vide: ", text, " with a fixation of: ", fixation);
            const textWithBionic = convertTextUsingTextVide(text, sep, fixation)

            return {text, textWithBionic, fixation};
        });
    }

    // DOCX files
    else if(fileType == '.docx'){
        const mammoth = require('mammoth');

        mammoth.extractRawText({buffer: fileData}).then(function(result){
            var text = result.value;

            console.log("Text to be converted with text-vide: ", text, " with a fixation of: ", fixation);
            const textWithBionic = convertTextUsingTextVide(text, sep, fixation)

            return {text, textWithBionic, fixation};
        });

    }

    // RTF files
    else if(fileType == '.rtf'){
        const rtfParser = require('rtf-parser');

        rtfParser.stream(fs.createReadStream(filePath), function(err, doc){
            if(err){
                console.error(err);
                return;
            }

            var text = "";
            for(var i = 0; i < doc.content.length; i++){
                for(var j = 0; j < doc.content[i].content.length; j++){
                    text += doc.content[i].content[j].value;
                }
                text+= '\n';
            }

            console.log("Text to be converted with text-vide: ", text, " with a fixation of: ", fixation);
            const textWithBionic = bionicReaderService.convertTextUsingTextVide(text, sep, fixation)

            return {text, textWithBionic, fixation};
        });
    }

    // HTML files
    else if(fileType == '.html'){
        const { convert } = require('html-to-text');

        var text = convert(fileData)
        console.log(text);

        console.log("Text to be converted with text-vide: ", text, " with a fixation of: ", fixation);
        const textWithBionic = bionicReaderService.convertTextUsingTextVide(text, sep, fixation)

        return {text, textWithBionic, fixation};
    }

    else{
        console.error(fileType + " is not supported!");
    }
}

module.exports = {convertText, convertTextUsingTextVide, convertFile};

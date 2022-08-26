const bionicReaderService = require('../services/main');

module.exports = function (app) {
    app.get("/", (req, res) => {
        res.render("index.html");
    });

    app.get("/about", (req, res) => {
        res.render("about.html");
    });

    app.get("/healthcheck", (req, res) => {

        console.log("App UP");

        res.send({'status':'up'});
    });

    app.get("/bionic-reader/convert", (req, res) => {
        const text = req.query['content'];

        console.log("Text to be converted: ", text);

        bionicReaderService.convertText(text)
            .then(textWithBionicReading => {
                console.log("Text with Bionic Reading: ", textWithBionicReading);
                res.send(textWithBionicReading);
            })
            .catch(error => {
                console.log('Error: ', error);

                res.render(error);
            });
    });

    app.get("/bionic-reader/convert/text-vide", (req, res) => {
        const text = req.query['text'];
        const sep = req.query['sep'];
        const fixation = req.query['fixation'];

        // Unused
        const saccade = req.query['saccade'];

        console.log("Text to be converted with text-vide: ", text, " with a fixation of: ", fixation, " and a saccade of: ", saccade);

        const textWithBionic = bionicReaderService.convertTextUsingTextVide(text, sep, fixation)

        res.render('customise.ejs', {text, textWithBionic, fixation, saccade});
    });

    app.post("/bionic-reader/convert/text-vide-file", (req, res) => {
        const formidable = require('formidable');
        const fs = require('fs');
        const path = require('path');

        const form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files){
            if(err){
                console.error(err);
                return;
            }
            var filePath = files.fileUpload.filepath;
            var fileType = path.extname(files.fileUpload.originalFilename);

            const sep = fields.sep;
            const fixation = fields.fixation;

            var fileData = fs.readFileSync(filePath);

            bionicReaderService.convertFile(fileData, fileType, {sep, fixation})
                .then(({text, textWithBionic, fixation}) => {
                    res.render('customise.ejs', {text, textWithBionic, fixation});
                })
                .catch((err) => {
                    console.log(err);
                })
        });
    });
    
    app.post("/download", (req, res) => {

        const bionicText = req.body['bionicText'];
        const filename = req.body['filename'];
        const fileType = req.body['fileType'];     
        
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

    });    
}
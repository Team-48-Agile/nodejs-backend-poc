const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
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

    app.post("/bionic-reader/convert/text-vide", (req, res) => {
        const text = req.body['text'];
        const sep = req.body['sep'];
        const fixation = req.body['fixation'];

        // Unused
        const saccade = req.body['saccade'];

        console.log("Text to be converted with text-vide: ", text, " with a fixation of: ", fixation, " and a saccade of: ", saccade);

        const textWithBionic = bionicReaderService.convertTextUsingTextVide(text, sep, fixation)

        res.render('customise.ejs', {text, textWithBionic, fixation, saccade});
    });

    app.post("/bionic-reader/convert/text-vide-file", (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            const filePath = files.fileUpload.filepath;
            const fileType = path.extname(files.fileUpload.originalFilename);
            const fileData = fs.readFileSync(filePath);
            const sep = fields.sep;
            const fixation = fields.fixation;

            bionicReaderService.convertFile(fileData, fileType, filePath, {sep, fixation})
                .then(({text, textWithBionic, fixation}) => {
                    res.render('customise.ejs', {text, textWithBionic, fixation});
                })
                .catch((err) => {
                    console.log(err);
                })
        });
    });
    
    app.post("/download", async (req, res) => {

        const bionicText = req.body['bionicText'];
        const filename = req.body['filename'];
        const fileType = req.body['fileType'];

        bionicReaderService.downloadFile(bionicText, filename, fileType)
            .then((file) => {
                let filename = path.basename(file);
                let mimetype = mime.lookup(file);

                res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                res.setHeader('Content-type', mimetype);

                let filestream = fs.createReadStream(file);

                filestream.pipe(res);
            })
            .catch((err) => console.log('Error: '+ err));
    });    
}
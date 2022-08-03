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
}
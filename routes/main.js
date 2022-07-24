const bionicReaderService = require('../services/main');

module.exports = function (app) {
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
        const text = req.query['content']
        const sep = req.query['sep'];
        const fixationPoint = req.query['fixationPoint']

        console.log("Text to be converted: ", text);

        const textWithBionic = bionicReaderService.convertTextUsingTextVide(text, sep, fixationPoint)

        res.send(textWithBionic);
    });
}
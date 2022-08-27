const chai = require('chai')
const expect = chai.expect;
chai.use(require('chai-string'));
const fs = require('fs');
const service = require('../services/main')

describe('When converting text using text-vide library', () => {

    describe('And passing only text as argument', () => {
        it('should return text with default separator and fixation point applied', async () => {

            const text = service.convertTextUsingTextVide('lorem ipsum');
            expect(text).to.equal('<b>lor</b>em <b>ips</b>um');
        });
    });

    describe('And passing custom optional separator and fixation point', () => {
        it('should return text with custom optional separator and fixation point applied', async () => {

            const text = service.convertTextUsingTextVide('lorem ipsum', '**', 5);
            expect(text).to.equal('**lo**rem **ip**sum');
        });
    });

});

describe('When converting text from file input', () => {
    it('and file is of type TXT', async () => {
        let fileData = 'lorem ipsum';
        let fileType = '.txt';
        let filePath = '/';
        let customizationParams = {fixation: 1};
        let expected = {text: 'lorem ipsum', textWithBionic: '<b>lor</b>em <b>ips</b>um', fixation: 1};

        const actual = await service.convertFile(fileData, fileType, filePath, customizationParams);

        expect(actual).to.deep.equal(expected)
    });

    it('and file is of type PDF', async () => {
        let fileData = fs.readFileSync('test_files/test-small-text.pdf');
        let fileType = '.pdf';
        let filePath = 'test_files/';
        let customizationParams = {fixation: 1};
        let expected = {fixation: 1, text: "lorem ipsum dolor sit amet", textWithBionic: "<b>lor</b>em <b>ips</b>um <b>dol</b>or <b>si</b>t <b>ame</b>t"}

        const actual = await service.convertFile(fileData, fileType, filePath, customizationParams);

        expect(actual.text).to.containIgnoreSpaces(expected.text)
        expect(actual.textWithBionic).to.containIgnoreSpaces(expected.textWithBionic)
        expect(actual.fixation).to.be.equal(expected.fixation)
    });

    it('and file is of type DOCX', async () => {
        let fileData = fs.readFileSync('test_files/test-small-text.docx');
        let fileType = '.docx';
        let filePath = 'test_files/';
        let customizationParams = {fixation: 1};
        let expected = {fixation: 1, text: "lorem ipsum dolor sit amet", textWithBionic: "<b>lor</b>em <b>ips</b>um <b>dol</b>or <b>si</b>t <b>ame</b>t"}

        const actual = await service.convertFile(fileData, fileType, filePath, customizationParams);

        expect(actual.text).to.containIgnoreSpaces(expected.text)
        expect(actual.textWithBionic).to.containIgnoreSpaces(expected.textWithBionic)
        expect(actual.fixation).to.be.equal(expected.fixation)
    });

    it('and file is of type RTF', async () => {
        let fileData = fs.readFileSync('test_files/test-small-text.rtf');
        let fileType = '.rtf';
        let filePath = 'test_files/test-small-text.rtf';
        let customizationParams = {fixation: 1};
        let expected = {fixation: 1, text: "lorem ipsum dolor sit amet", textWithBionic: "<b>lor</b>em <b>ips</b>um <b>dol</b>or <b>si</b>t <b>ame</b>t"}

        const actual = await service.convertFile(fileData, fileType, filePath, customizationParams);

        expect(actual.text).to.containIgnoreSpaces(expected.text)
        expect(actual.textWithBionic).to.containIgnoreSpaces(expected.textWithBionic)
        expect(actual.fixation).to.be.equal(expected.fixation)
    });

    it('and file is of type HTML', async () => { //TODO: Uncomment and fix second assert
        let fileData = fs.readFileSync('test_files/test-small-text.html');
        let fileType = '.html';
        let filePath = 'test_files/';
        let customizationParams = {fixation: 1};
        let expected = {fixation: 1, text: "lorem ipsum dolor sit amet", textWithBionic: "<b>lor</b>em <b>ips</b>um <b>dol</b>or <b>si</b>t <b>ame</b>t"}

        const actual = await service.convertFile(fileData, fileType, filePath, customizationParams);

        expect(actual.text).to.containIgnoreSpaces("Lorem ipsum dolor sit amet")
        // expect(actual.textWithBionic).to.containIgnoreSpaces("<b>lor</b>em <b>ips</b>um <b>dol</b>or <b>si</b>t <b>ame</b>t")
        expect(actual.fixation).to.be.equal(1)
    });
})
const chai = require('chai')
const expect = chai.expect;
chai.use(require('chai-string'));
const fs = require('fs');
const path = require( 'path' );
const fileReader = require('../adapter/fileReader')

describe('fileReader.readRtf()', () => { //TODO: Remove Skip
    it('should receive file path and return text as string', async () => {

        let filePath = path.join('test_files', 'test-small-text.rtf' );
        let expected = 'lorem ipsum dolor sit ame\n'

        const actual = await fileReader.readAndCacheRtfContent(filePath);

        expect(actual).to.equal(expected);
    });
});

describe('fileReader.readTxt()', () => {
    it('should receive file data as stream and return text as string', async () => {

        let filePath = path.join('test_files', 'test-small-text.txt' );
        let fileData = fs.readFileSync(filePath);
        let expected = 'lorem ipsum dolor sit amet'

        const actual = await fileReader.readText(fileData);

        expect(actual).to.equal(expected);
    });
});

describe('fileReader.readPdf()', () => {
    it('should receive file data as stream and return text as string', async () => {

        let filePath = path.join('test_files', 'test-small-text.pdf' );
        let fileData = fs.readFileSync(filePath);
        let expected = 'lorem ipsum dolor sit amet'

        const actual = await fileReader.readPdf(fileData);

        expect(actual).to.containIgnoreSpaces(expected);
    });
});

describe('fileReader.readDocx()', () => {
    it('should receive file data as stream and return text as string', async () => {

        let filePath = path.join('test_files', 'test-small-text.docx' );
        let fileData = fs.readFileSync(filePath);
        let expected = 'lorem ipsum dolor sit amet'

        const actual = await fileReader.readDocx(fileData);

        expect(actual).to.containIgnoreSpaces(expected);
    });
});

describe('fileReader.readHtml()', () => { //TODO: Fix
    it('should receive file data as stream and return text as string', async () => {

        let filePath = path.join('test_files', 'test-small-text.html' );
        let fileData = fs.readFileSync('test_files/test-small-text.html');
        let expected = 'lorem ipsum dolor sit amet'

        const actual = await fileReader.readHtml(fileData);

        // expect(actual.text).to.containIgnoreSpaces(expected)
    });
});
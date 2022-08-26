const chai = require('chai')
const expect = chai.expect;
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
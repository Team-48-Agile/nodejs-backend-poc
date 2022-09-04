const request = require("supertest");
const chai = require('chai')
const expect = chai.expect
const chaiJestMock = require('chai-jest-mocks');

chai.use(chaiJestMock);

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
require("../routes/main")(app);

describe(('GET /healthcheck'), () => {
    test("should check if application is up", done => {
        request(app)
            .get("/healthcheck")
            .expect("Content-Type", "application/json; charset=utf-8")
            .expect(200, done)
            .expect({'status':'up'});
    });
});

describe('POST /bionic-reader/convert/text-vide', () => {
    const endpoint = '/bionic-reader/convert/text-vide';
    const convertedText = "**lo**rem **ip**sum";

    test("should parse correctly query params and return converted text", done => {
        request(app)
            .post(endpoint)
            .type('form')
            .send({ text: 'lorem ipsum', sep: '**', fixation: 5, saccade: 'none' })
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect((res) => {
                expect(res.text).to.contain(convertedText);
            })
            .expect(200, done);
    });

    test("should call service with text, separation and fixation point", done => {
        const query = {text: 'lorem ipsum', sep:'**', fixation: '5', saccade: 'none'};

        jest.mock('../services/main.js')
        const convertToBionic = require('../services/main.js').convertTextUsingTextVide;
        convertToBionic.mockResolvedValue(query.text, query.sep, query.fixation);

        request(app)
            .post(endpoint)
            .type('form')
            .send({ text: 'lorem ipsum', sep: '**', fixation: 5, saccade: 'none' })
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect((res) => {
                // expect(convertToBionic).should.have.been.calledOnce(query.text, query.sep, query.fixation);
            })
            .expect(200, done);
    });

    test("should render customise.ejs with original text, converted text, fixation point and saccade", done => {
        request(app)
            .post(endpoint)
            .type('form')
            .send({ text: 'lorem ipsum', sep: '**', fixation: 5, saccade: 'none' })
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, done);
    });
});

describe('POST /bionic-reader/convert/text-vide-file', (req, res) => {
    const endpoint = '/bionic-reader/convert/text-vide-file';
    const filePath = 'test_files/test.txt';
    const convertedText = "**lo**rem **ip**sum";

    const requestForm = {
        filepath: filePath
    }

    test("should parse txt file", () => {
        // request(app)
        //     .post('/bionic-reader/convert/text-vide-file')
        //     // .type('form')
        //     .send(requestForm)
        //     .expect("Content-Type", "text/html; charset=utf-8")
        //     .expect((res) => {
        //         console.log(res.text);
        //         // expect(res.text).to.contain(convertedText);
        //     })
        //     .expect(200, done)
        //     .end(done => done.end());
    });
    test("should parse pdf file", () => {
    });
    test("should parse rtf file", () => {
    });
    test("should parse docx file", () => {
    });
    test("should parse html file", () => {
    });
})
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

describe('GET /bionic-reader/convert/text-vide', () => {
    const endpoint = '/bionic-reader/convert/text-vide';
    const convertedText = "**lo**rem **ip**sum";

    test("should parse correctly query params and return converted text", done => {
        request(app)
            .get(endpoint)
            .query({ text: 'lorem ipsum', sep: '**', fixation: 5, saccade: 'none' })
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
            .get(endpoint)
            .query({ text: 'lorem ipsum', sep: '**', fixation: 5, saccade: 'none' })
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect((res) => {
                // expect(convertToBionic).should.have.been.calledOnce(query.text, query.sep, query.fixation);
            })
            .expect(200, done);
    });

    test("should render customise.ejs with original text, converted text, fixation point and saccade", done => {
        request(app)
            .get(endpoint)
            .query({ text: 'lorem ipsum', sep: '**', fixation: 5, saccade: 'none' })
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, done);
    });
});

describe('POST /bionic-reader/convert/text-vide-file', (req, res) => {
    const endpoint = '/bionic-reader/convert/text-vide';
})
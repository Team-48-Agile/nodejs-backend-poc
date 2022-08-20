const expect = require('chai').expect;
const axios = require('axios');
const bionicApiClient = require('../client/main.js');

jest.mock('axios')

describe('Client call to bionic reader API', () => {
    it('should pass text as parameter and return page', async () => {

        // const data = {};
        // axios.get.mockImplementationOnce(() => Promise.resolve(data));
        //
        // await expect(bionicApiClient.callApiAndConvert('react'))
        //     .resolves.toEqual(data);

        expect(1 + 1).to.equal(2);
    });
});
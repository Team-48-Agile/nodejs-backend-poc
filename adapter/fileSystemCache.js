const fileWriter = require('./fileWriter');
const fs = require('fs');
const CACHED_RTF_LOCATION = __dirname + '/' + 'cached_rtf.txt';

const writeCache = async (text) => {
    const path = fileWriter.writeTxt(CACHED_RTF_LOCATION, text);
    console.log('Cached RTF content: ', path)
}

const getCachedRtf = async () => {
    const text = fs.readFileSync(CACHED_RTF_LOCATION, 'utf8');

    console.log('CACHE LOCATION: ', CACHED_RTF_LOCATION);
    console.log('GET CACHE: ', text);

    return text;
};
const cleanCache = async () => {
    fs.unlinkSync(CACHED_RTF_LOCATION);
    console.log('CLEANED CACHE');
};

module.exports = {writeCache, getCachedRtf, cleanCache, CACHED_RTF_LOCATION}
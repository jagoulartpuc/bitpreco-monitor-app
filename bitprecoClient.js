const axios = require('axios');
const https = require('https');

const bitPrecoUrl = 'https://api.bitpreco.com/';

let config = {
    headers: {
        'Accept': 'application/json',
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
}

async function getTicker(symbol) {
    
    try {
        const response = await axios.get(bitPrecoUrl + symbol + '-brl/ticker', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getTrades(symbol) {
    
    try {
        const response = await axios.get(bitPrecoUrl + symbol + '-brl/trades', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports.getTicker = getTicker;
module.exports.getTrades = getTrades;
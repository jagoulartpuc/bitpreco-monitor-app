const axios = require('axios');
const https = require('https');

const bitPrecoUrl = 'https://api.bitpreco.com/';

async function getPrice() {
    let config = {
        headers: {
            'Accept': 'application/json',
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    }
    try {
        const response = await axios.get(bitPrecoUrl + 'btc' + '-brl/ticker', config);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports.getPrice = getPrice;
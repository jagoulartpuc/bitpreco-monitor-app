const bitprecoClient = require('./bitprecoClient.js');
const express = require('express');
const app = express();

async function createResponse() {
    var ticker = await bitprecoClient.getPrice()
    console.log("Ticker: ", ticker);
    return {
        bitcoinPrice: ticker.last
    }
}

app.get('/prices', (req, res) => {
    createResponse()
        .then(function (response) {
            res.send(response);
        })
})

app.listen(8082, () => {
    console.log(`App listening at http://localhost:8082`)
})
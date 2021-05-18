const bitprecoClient = require('./bitprecoClient.js');
const express = require('express');
const calculator = require('./calculator.js')
const app = express();

async function createResponse() {
    var btcTicker = await bitprecoClient.getTicker('btc');
    var ethTicker = await bitprecoClient.getTicker('eth');
    console.log("Ticker: ", btcTicker);
    return [
        {
            bitcoinPrice: btcTicker.last,
            high: btcTicker.high,
            low: btcTicker.low,
            median: calculator.calculateMedian(btcTicker.high, btcTicker.low),
            lastHighVar: calculator.calculateHighVar(btcTicker.high, btcTicker.last),
            lastLowVar: calculator.calculateLowVar(btcTicker.low, btcTicker.last)
        },
        {
            ethPrice: ethTicker.last,
            high: ethTicker.high,
            low: ethTicker.low,
            median: calculator.calculateMedian(ethTicker.high, ethTicker.low),
            lastHighVar: calculator.calculateHighVar(ethTicker.high, ethTicker.last),
            lastLowVar: calculator.calculateLowVar(ethTicker.low, ethTicker.last)
        }
    ]
}

async function getBiggestTrade(symbol) {
    var tradesList = await bitprecoClient.getTrades(symbol);
    console.log("Trades: ", tradesList);
    var biggestTrade = null
    biggestTrade = Math.max.apply(Math, tradesList.map(trade => { return trade.amount; }))
    return {
        biggestTrade: biggestTrade
    }
}

app.get('/prices', (req, res) => {
    createResponse()
        .then(function (response) {
            res.send(response);
        })
})

app.get('/biggest-trade/:symbol', (req, res) => {
    getBiggestTrade(req.params.symbol)
        .then(function (response) {
            res.send(response);
        })
})

app.listen(8082, () => {
    console.log(`App listening at http://localhost:8082`)
})
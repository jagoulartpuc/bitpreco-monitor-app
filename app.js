const bitprecoClient = require('./bitprecoClient.js');
const express = require('express');
const calculator = require('./calculator.js')
const app = express();

async function createResponse() {
    var btcTicker = await bitprecoClient.getTicker('btc');
    var ethTicker = await bitprecoClient.getTicker('eth');
    console.log("BTC Ticker: ", btcTicker);
    console.log("ETH Ticker: ", ethTicker);

    var btcMedian = calculator.calculateMedian(btcTicker.high, btcTicker.low);
    var btcLastHighVar = calculator.calculateHighVar(btcTicker.high, btcTicker.last);
    var btcLastLowVar = calculator.calculateLowVar(btcTicker.low, btcTicker.last);
    var isWorthBuyingBtc = calculator.isWorthBuying(btcLastLowVar);

    var ethMedian = calculator.calculateMedian(ethTicker.high, ethTicker.low);
    var ethLastHighVar = calculator.calculateHighVar(ethTicker.high, ethTicker.last);
    var ethLastLowVar = calculator.calculateLowVar(ethTicker.low, ethTicker.last);
    var isWorthBuyingEth = calculator.isWorthBuying(ethLastLowVar);
    
    return [
        {
            bitcoinPrice: btcTicker.last,
            high: btcTicker.high,
            low: btcTicker.low,
            median: btcMedian,
            lastHighVar: btcLastHighVar,
            lastLowVar: btcLastLowVar,
            isWorthBuying: isWorthBuyingBtc
        },
        {
            ethPrice: ethTicker.last,
            high: ethTicker.high,
            low: ethTicker.low,
            median: ethMedian,
            lastHighVar: ethLastHighVar,
            lastLowVar: ethLastLowVar,
            isWorthBuying: isWorthBuyingEth
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
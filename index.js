const ccxt = require('ccxt');
const moment = require('moment');
const delay = require('delay');
const dotenv = require('dotenv');
dotenv.config();
const name = 'BTC/USDT';
const time = '1h';

const binance = 'binance',
    exchangeClass = ccxt[binance],
    exchange = new exchangeClass({
        'apiKey': process.env.API_KEY,
        'secret': process.env.SECRET_KEY
    })

    exchange.setSandboxMode(true);

async function printBalance() {

    const balance = await binance.fetchBalance();
    console.log(balance);
}

async function main() {
    const exchange = new ccxt.binance({ enableRateLimit: true })
    const prices = await exchange.fetchOHLCV(name, time, undefined, 5);
    const bPrices = prices.map(price => {
        return {
            timestamp: moment(price[0]).format('LT L'),
            open: price[1] + '$',
            hight: price[2] + '$',
            low: price[3] + '$',
            close: price[4] + '$',
            volume: price[5] + '$',
        }
    });
    console.log(bPrices);
}
main();
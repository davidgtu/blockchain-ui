const statsURL = "https://api.blockchain.info/stats";
const blockSizeURL = "https://api.blockchain.info/charts/avg-block-size"
const mempoolSizeURL = 'https://api.blockchain.info/charts/mempool-size';
const averageBlockSizeURL = 'https://api.blockchain.info/charts/avg-block-size?timespan=5weeks&rollingAverage=24hours';

function getStats() {
  return axios.get(statsURL);
}

function setMarketPrice() {
  getStats()
    .then(response => {
      let price = response.data.market_price_usd;
      const marketPriceNode = document.getElementById('marketPrice');

      countUp(marketPriceNode, 0, price, 2, 1);
    });
}

function setTransactionsPerDay() {
  getStats()
    .then(response => {
      let transactionNum = response.data.n_tx;
      const transactionNode = document.getElementById('transactionsPerDay');

      countUp(transactionNode, 0, transactionNum, 0, 1);
    });
}

function requestBlockSize() {
  return axios.get(blockSizeURL);
}

function requestChart(url) {
  return axios.get(url);
}

function calculateChartAverage(url, node) {
  requestChart(url)
    .then(response => {
      let responseValues = response.data.values;
      let valueArray = [];

      responseValues.map(object => {
        let yAxisValues = object.y;
        valueArray.push(yAxisValues);
      });

      let calculatedAverage = calcuteAverage(valueArray);
      let chartNode = document.getElementById(node)

      if (node === 'averageBlockSize') {
        countUp(chartNode, 0, calculatedAverage, 2, 1)
      } else if (node === 'averageMempoolSize') {
        countUp(chartNode, 0, calculatedAverage, 0, 1)
      }
    });
}

function calcuteAverage(arr) {
  return arr.reduce((previous, next) => {
    return previous + next;
  }) / arr.length;
}

function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function formatDecimal(number, places) {
  return number.toFixed(places);
}

function roundNumber(number) {
  return Math.round(number);
}

var easingFn = function (t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
}

var options = {
  useEasing: true,
  easingFn: easingFn,
  useGrouping: true,
  separator: ',',
  decimal: '.',
};

function countUp(target, startVal, endVal, decimals, duration) {
  new CountUp(target, startVal, endVal, decimals, duration, options).start();
}

const active = document.querySelector('.chart-nav__button.active').id;
const chartImage = document.getElementById('chartImage');
const chartText = document.getElementById('chartText');

const bitcoinCirculationImage = "../images/total-bitcoins.png";
const marketPriceImage = "../images/market-price.png";
const tradeVolumeImage = "../images/trade-volume.png";
const marketCapImage = "../images/market-cap.png";

function setChart(id) { // to make it reusable
  if (id === "bitcoinCirculationButton") {
    chartImage.src = bitcoinCirculationImage;
    chartText.textContent = "The total number of bitcoins that have already been mined."
  } else if (id === "marketPriceButton") {
    chartImage.src = marketPriceImage;
    chartText.textContent = "Average USD market price across major bitcoin exchanges."
  } else if (id === "capitalizationButton") {
    chartImage.src = marketCapImage;
    chartText.textContent = "The total USD value of bitcoin supply in circulation."
  } else if (id === "exchangeRateButton") {
    chartImage.src = tradeVolumeImage;
    chartText.textContent = "The total USD value of trading volume on major bitcoin exchanges."
  }
}

function init() {
  setMarketPrice();
  setTransactionsPerDay();
  calculateChartAverage(averageBlockSizeURL, 'averageBlockSize');
  calculateChartAverage(mempoolSizeURL, 'averageMempoolSize');
  setChart(active);
}

init();

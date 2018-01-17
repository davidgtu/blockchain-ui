const statsURL = "https://api.blockchain.info/stats";
const blockSizeURL = "https://api.blockchain.info/charts/avg-block-size"
const mempoolSizeURL = 'https://api.blockchain.info/charts/mempool-size';
const averageBlockSizeURL = 'https://api.blockchain.info/charts/avg-block-size?timespan=5weeks&rollingAverage=24hours';

const active = document.querySelector('.chart-nav__button.active').id;
const chartImage = document.getElementById('chartImage');
const chartText = document.getElementById('chartText');
const chartLink = document.getElementById('chartLink');

const bitcoinCirculationImage = "../images/total-bitcoins.png";
const marketPriceImage = "../images/market-price.png";
const tradeVolumeImage = "../images/trade-volume.png";
const marketCapImage = "../images/market-cap.png";

const bitcoinChart = "https://blockchain.info/charts/total-bitcoins";
const marketLink = "https://blockchain.info/charts/market-price";
const capitalizationLink = "https://blockchain.info/charts/market-cap";
const tradeVolumeLink = "https://blockchain.info/charts/trade-volume";

function getStats() {
  return axios.get(statsURL);
}

function setMarketPrice() {
  const marketPriceNode = document.getElementById('marketPrice');
  getStats()
    .then(response => {
      let price = response.data.market_price_usd;

      countUp(marketPriceNode, 0, price, 2, 1);
    })
    .catch(error => {
      console.error(error);
      countUp(marketPriceNode, 0, 11324.13, 2, 1); // fake data. not sure how to handle this case regarding cross-origin failing
    })
}

function setTransactionsPerDay() {
  const transactionNode = document.getElementById('transactionsPerDay');
  getStats()
    .then(response => {
      let transactionNum = response.data.n_tx;

      countUp(transactionNode, 0, transactionNum, 0, 1);
    })
    .catch(error => {
      countUp(transactionNode, 0, 314220, 0, 1);
    })
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
      })

      let calculatedAverage = calcuteAverage(valueArray);
      let chartNode = document.getElementById(node)

      if (node === 'averageBlockSize') {
        countUp(chartNode, 0, calculatedAverage, 2, 1)
      } else if (node === 'averageMempoolSize') {
        countUp(chartNode, 0, calculatedAverage, 0, 1)
      }
    })
    .catch(error => {
      let chartNode = document.getElementById(node);
      if (node === "averageMempoolSize") {
        countUp(chartNode, 0, 112537918, 0, 1)
      } else if (node === 'averageBlockSize') {
        countUp(chartNode, 0 , 1.05, 2, 1)
      }
      console.error(error);
    })
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

const ctx = document.getElementById('myChart');

function createChart(url) {
  requestLiveChart(url)
    .then(response => {
      ctx.style.backgroundColor = "white";
      let chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: getAxis("x", response.data.values),
          datasets: [{
            label:'Bitcoins in Circulation',
            data: getAxis('y', response.data. values),
            backgroundColor: [
              'rgba(7, 74, 122, 0.6)',
              'rgba(7, 74, 122, 0.9)'
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true
        }
      });

      chartText.textContent = response.data.description;
    })
    .catch(error => {
      if (!ctx.classList.contains('hidden')) {
        ctx.classList.add('hidden');
        chartImage.classList.remove('hidden');
      }
      setBackupChart(document.querySelector('.chart-nav__button.active').id);
    })
}

function getAxis(axis ,arr) {
  if (axis === "x") {
    return arr.map(values => {
      return values.x;
    });
  } else if (axis === "y") {
    return arr.map(values => {
      return values.y;
    });
  }
}

function requestLiveChart(url) {
  return axios.get(url);
}

function setChart(id) { // to make it reusable
  if (id === "bitcoinCirculationButton") {
    // chartImage.src = bitcoinCirculationImage;
    // chartText.textContent = "The total number of bitcoins that have already been mined."
    // chartLink.href = bitcoinChart;
    createChart('https://api.blockchain.info/charts/total-bitcoins')
  } else if (id === "marketPriceButton") {
    // chartImage.src = marketPriceImage;
    // chartText.textContent = "Average USD market price across major bitcoin exchanges."
    // chartLink.href = marketLink;
    createChart('https://api.blockchain.info/charts/market-price')
  } else if (id === "capitalizationButton") {
    // chartImage.src = marketCapImage;
    // chartText.textContent = "The total USD value of bitcoin supply in circulation."
    // chartLink.href = capitalizationLink;
    createChart('https://api.blockchain.info/charts/n-transactions')
  } else if (id === "exchangeRateButton") {
    // chartImage.src = tradeVolumeImage;
    // chartText.textContent = "The total USD value of trading volume on major bitcoin exchanges."
    // chartLink.href = tradeVolumeLink;
    createChart('https://api.blockchain.info/charts/n-transactions')
  }
}

function setBackupChart(id) {
  if (id === "bitcoinCirculationButton") {
    chartImage.src = bitcoinCirculationImage;
    chartText.textContent = "The total number of bitcoins that have already been mined."
    chartLink.href = bitcoinChart;
  } else if (id === "marketPriceButton") {
    chartImage.src = marketPriceImage;
    chartText.textContent = "Average USD market price across major bitcoin exchanges."
    chartLink.href = marketLink;
  } else if (id === "capitalizationButton") {
    chartImage.src = marketCapImage;
    chartText.textContent = "The total USD value of bitcoin supply in circulation."
    chartLink.href = capitalizationLink;
  } else if (id === "exchangeRateButton") {
    chartImage.src = tradeVolumeImage;
    chartText.textContent = "The total USD value of trading volume on major bitcoin exchanges."
    chartLink.href = tradeVolumeLink;
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

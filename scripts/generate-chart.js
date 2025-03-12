const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

async function generateChart() {
  const data = JSON.parse(fs.readFileSync('language-stats.json'));
  
  const total = data.languages.reduce((sum, lang) => sum + lang.size, 0);
  const chartData = {
    labels: data.languages.map(lang => `${lang.name} (${((lang.size / total) * 100).toFixed(1)}%)`),
    datasets: [{
      data: data.languages.map(lang => lang.size),
      backgroundColor: data.languages.map(lang => lang.color)
    }]
  };

  const chart = new ChartJSNodeCanvas({ width: 800, height: 600 });
  const image = await chart.renderToBuffer({
    type: 'pie',
    data: chartData,
    options: { plugins: { legend: { display: false } } }
  });
  
  fs.writeFileSync('language-chart.png', image);
}

generateChart();

import React from "react";
import Plot from "react-plotly.js";
import { Container } from "semantic-ui-react";
import { useSelector } from "react-redux";

const CandlestickChart = () => {
  const candleData = useSelector((state) => state.app.candleData);
  const stockInfo = useSelector((state) => state.app.stockInfo);

  var trace1 = {
    x: candleData.x,
    close: candleData.close,
    decreasing: { line: { color: "#cc190c" } },
    high: candleData.high,
    increasing: { line: { color: "#04910e" } },
    line: { color: "rgba(31,119,180,1)" },
    low: candleData.low,
    open: candleData.open,
    type: "candlestick",
    xaxis: "x",
    yaxis: "y",
  };

  var data = [trace1];

  var layout = {
    dragmode: "zoom",
    margin: {
      r: 25,
      t: 25,
      b: 5,
      l: 50,
      pad: 3,
    },
    autosize: true,
    width: 1150,
    height: 550,
    title: {
      text: `${
        stockInfo.company_name ? stockInfo.company_name : stockInfo.companyName
      } (${stockInfo.symbol})`,
      y: 0.97,
    },
    showlegend: false,
    xaxis: {
      nticks: 13,
      autorange: true,
      showgrid: false,
      domain: [0, 1],
      range: ["09:30", "16:00"],
      rangeslider: { range: ["09:30", "16:00"], type: "time" },
      type: "time",
    },
    yaxis: {
      autorange: true,
      title: "Price",
      //   domain: [0, 1],
      range: [
        Math.min(...candleData.low) * 0.975,
        Math.max(...candleData.high) * 1.025,
      ],
      type: "linear",
    },
  };
  return (
    <Container style={{ padding: "1em" }}>
      <Plot data={data} layout={layout} />
    </Container>
  );
};

export default CandlestickChart;

import React from "react";
import { Container } from "semantic-ui-react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";

const StockChart = () => {

  const chartData = useSelector((state) => state.app.chartData);
  const stockInfo = useSelector((state) => state.app.stockInfo);

  if (chartData.averageY) {

  let Price = {

    x: chartData.minutesX,
    y: chartData.averageY,
    type: "scatter",
    mode: "lines",
    marker: { color: "black" },
    name: 'Price (USD)',
    showlegend: false
  }

  let Volume = {
    type: "bar", 
    x: chartData.minutesX, 
    y: chartData.volumeY,
    marker: { color: 'blue'},
    yaxis: 'y2',
    name: 'Volume',
    showlegend: false

  }

  
    return (
      <Container style={{paddingTop: '1em'}}>

        <Plot
          data={[ Price, 
            Volume
        ]}

          layout={{
            margin: {l: 50, r: 25, t: 25, b: 5, pad: 3},
            autosize: true,
            width: 1150,
            height: 550,
            title: { 
              text: `${stockInfo.company_name ? stockInfo.company_name : stockInfo.companyName} (${stockInfo.symbol})`,
              y: 0.97
          },
            xaxis: {
              showgrid: false,
              nticks: 13,
            //   autorange: true,
              range: ["09:30", "16:00"],
              rangeslider: { range: ["09:30", "16:00"], type: "time" },
            },
            yaxis: {
              autorange: true,
              title: 'Price',
              range: [
                (Math.min(...chartData.averageY) * 0.975),
                (Math.max(...chartData.averageY) * 1.025),
              ],
              type: "linear"
            },
            yaxis2: {
                visible: false,
                showgrid: false,
                title: 'Volume',
                range: [0, (Math.max(...chartData.volumeY)*4)],
                type: "linear",
                overlaying: 'y',
                side: 'right'
            }
          }}
        />

      </Container>
    );
  } else {
    return <></>;
  }
};

export default StockChart;

import React from "react";
import FusionCharts from "fusioncharts";
import TreeMap from "fusioncharts/fusioncharts.treemap";
import ReactFusioncharts from "react-fusioncharts";
import { useSelector } from "react-redux";
import {Container} from 'semantic-ui-react'

// Resolves charts dependancy
TreeMap(FusionCharts);

const SectorTreemap = () => {
  const treemap = useSelector((state) => state.app.treemap);

  const dataSource = {
    data: [
      {
        label: "S&P 500 Sector Funds",
        value: treemap.sum,
        data: treemap.data,
      },
    ],
    colorrange: {
      mapbypercent: "1",
      gradient: "1",
      minvalue: "-2",
      code: "#C70039",
      startlabel: "Loss",
      endlabel: "Gain",
      color: [
        {
          code: "#179611",
          maxvalue: "2",
        },
        {
          code: "#CACDC4",
          maxvalue: "0",
          label: "",
        },
      ],
    },
    chart: {
      algorithm: "squarified",
      caption: "Overall Market View In Regards to the 11 Major Sectors",
      subcaption: "Gradient based on intraday price change of sector funds",
      theme: "fusion",
      legendcaption: "% Change of Sector Fund Price",
      plottooltext:
        "<b>$label</b> <br>Change <b>$sValue% </b><br>Price: $<b>$dataValue</b>",
    },
  };

  return (
    <Container style={{height: '25em'}}>
      <ReactFusioncharts
        type="treemap"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </Container>
  );
};

export default SectorTreemap;

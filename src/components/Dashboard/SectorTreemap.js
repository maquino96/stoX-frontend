import React from 'react'
import FusionCharts from "fusioncharts";
import TreeMap from "fusioncharts/fusioncharts.treemap";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
TreeMap(FusionCharts);

const dataSource = {
  data: [
        {
          label: "Samsung",
          value: "2217",
          data: [
            {
              label: "Galaxy Note 4",
              value: "519",
              svalue: "1.09"
            },
            {
              label: "Galaxy S6 Edge",
              value: "448",
              svalue: "1.48"
            },
            {
              label: "Galaxy S6",
              value: "416",
              svalue: "1.13"
            },
            {
              label: "Galaxy J1",
              value: "304",
              svalue: "1.18"
            },
            {
              label: "Galaxy J7",
              value: "159",
              svalue: "1.36"
            },
            {
              label: "Galaxy Note5",
              value: "191",
              svalue: "1.48"
            },
            {
              label: "galaxy A8",
              value: "180",
              svalue: "1.19"
            }
          ]
        }
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
        maxvalue: "2"
      },
      {
        code: "#CACDC4",
        maxvalue: "0",
        label: ""
      }
    ]
  },
  chart: {
    algorithm: "squarified",
    caption: "Mobile Sales Analysis for Last Quarter",
    subcaption: "Brand Smart<br>Based on SAR values",
    theme: "candy",
    legendcaption: "Specific Absorption Rate (SAR) in W/kg",
    plottooltext:
      "<b>$label</b><br>SAR (Body): <b>$sValue W/kg</b><br>Units Sold: <b>$dataValue</b>"
  }
};

class SectorTreemap extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="treemap"
        width="100%"
        height="150%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}

export default SectorTreemap
import React from "react";
import {
  Chart as ReactChart,
  AxisOptions,
  ChartOptions,
} from "react-charts";

// Define the data structure
type Datum = {
  primary: Date;
  secondary: number;
};

const LineChart: React.FC = () => {

  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          { primary: new Date("2023-01-01"), secondary: 10 },
          { primary: new Date("2023-02-01"), secondary: 15 },
          { primary: new Date("2023-03-01"), secondary: 20 },
        ],
      },
      {
        label: "Series 2",
        data: [
          { primary: new Date("2023-01-01"), secondary: 5 },
          { primary: new Date("2023-02-01"), secondary: 10 },
          { primary: new Date("2023-03-01"), secondary: 25 },
        ],
      },
    ],
    []
  );


  const primaryAxis = React.useMemo<AxisOptions<Datum>>(
    () => ({
      getValue: (datum) => datum.primary,
      scaleType: "time",
    }),
    []
  );


  const secondaryAxes = React.useMemo<AxisOptions<Datum>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <div
      style={{
        width: "100%",
        height: "400px", 
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <ReactChart<Datum>
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          tooltip: true, 
        }}
      />
    </div>
  );
};

export default LineChart;

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import moment from "moment";

export default function GlucoseLevels(props) {
  const formatXAxis = (tickItem) => {
    return moment(tickItem).format("DD");
  };

  return (
    <React.Fragment>
      <h1>Glucose levels</h1>
      <LineChart
        width={1000}
        height={400}
        data={props.glucoseLevels}
        syncId="anyId"
        margin={{
          top: 5,
          right: 50,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatXAxis}>
          <Label value="Day" position="right" />
        </XAxis>
        <YAxis>
          <Label value="Values" position="left" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          name="Glucose"
          dataKey="value"
          stroke="#C70039"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </React.Fragment>
  );
}

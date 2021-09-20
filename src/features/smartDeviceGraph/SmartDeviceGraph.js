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

export default function SmartDeviceGraph(props) {
  const formatXAxis = (tickItem) => {
    let date = new Date(tickItem);
    return moment(date).format("DD");
  };

  return (
    <React.Fragment>
      <h1>Steps</h1>
      <LineChart
        width={1000}
        height={400}
        data={props.smartDeviceData}
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
          name="steps"
          dataKey="value"
          stroke="#C1A61A"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </React.Fragment>
  );
}

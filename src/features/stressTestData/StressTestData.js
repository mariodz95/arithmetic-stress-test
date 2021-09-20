import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import moment from "moment";

export default function StressTestData(props) {
  const formatXAxis = (tickItem) => {
    let date = new Date(tickItem * 1000);
    return moment(date).format("DD. h:mm:ss a");
  };

  return (
    <React.Fragment>
      <h1>Stress test data</h1>
      <BarChart
        width={1000}
        height={400}
        data={props.stressTestData}
        margin={{
          top: 5,
          right: 50,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="insertedDate.seconds"
          tickFormatter={formatXAxis}
          value="Dates"
        >
          <Label value="Day" position="right" />
        </XAxis>
        <YAxis>
          <Label value="Values" position="left" />
        </YAxis>
        <Tooltip labelFormatter={(t) => new Date(t * 1000).toLocaleString()} />
        <Legend />
        <Bar
          name="Glucose before test"
          dataKey="glucoseLevelBeforeTest"
          fill="#87CEEB"
        />
        <Bar
          name="Glucose after test"
          dataKey="glucoseLevelAfterTest"
          fill="#FF4500"
        />
      </BarChart>
    </React.Fragment>
  );
}

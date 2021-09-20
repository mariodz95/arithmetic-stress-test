import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function SmartDeviceStatistic(props) {
  const [averageStepsbyDay, setAverageStepsbyDay] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const [totalDistance, setTotalDistance] = useState(0);
  const [averageDistanceByDay, setAverageDistanceByDay] = useState(0);

  const [totalCalories, setTotalCalories] = useState(0);
  const [averageCaloriesbyDay, setAverageCaloriesbyDay] = useState(0);

  const [averageHeartRate, setAverageHeartRate] = useState(0);
  useEffect(() => {
    let daysOfMeassurements = props.smartDeviceData.length;
    const totalSteps = _.sumBy(props.smartDeviceData, (data) => data.steps);
    setTotalSteps(totalSteps);
    setAverageStepsbyDay(totalSteps / daysOfMeassurements);

    const totalDistance = _.sumBy(
      props.smartDeviceData,
      (data) => data.distance
    );
    setTotalDistance(totalDistance);
    setAverageDistanceByDay(totalDistance / daysOfMeassurements);

    const totalCalories = _.sumBy(
      props.smartDeviceData,
      (data) => data.calories
    );
    setTotalCalories(totalCalories);
    setAverageCaloriesbyDay(totalCalories / daysOfMeassurements);

    const totalHeartRate = _.sumBy(
      props.smartDeviceData,
      (data) => data.heartRate
    );
    setAverageHeartRate(totalHeartRate / daysOfMeassurements);
  });
  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Steps</th>
            <th>Avg steps</th>
            <th>Distance</th>
            <th>Avg. distance</th>
            <th>Calories</th>
            <th>Avg. calories</th>
            <th>Avg. heart rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vrijednosti</td>
            <td>{totalSteps}</td>
            <td>{averageStepsbyDay}</td>
            <td>{totalDistance} km </td>
            <td>{averageDistanceByDay} km</td>
            <td>{totalCalories} </td>
            <td>{averageCaloriesbyDay} </td>
            <td>{averageHeartRate} </td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
}

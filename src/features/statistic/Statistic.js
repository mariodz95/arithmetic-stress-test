import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";

export default function Statistic(props) {
  const [averageBeforeMeal, setAverageBeforeMeal] = useState(0);
  const [beforeMealMesurrements, setBeforeMealMesurrements] = useState(0);
  const [minBeforeMeal, setMinBeforeMeal] = useState(0);
  const [maxBeforeMeal, setMaxBeforeMeal] = useState(0);

  const [averageAfterMeal, setAverageAfterMeal] = useState(0);
  const [afterMealMesurrements, setAfterMealMesurrements] = useState(0);
  const [minAfterMeal, setMinAfterMeal] = useState(0);
  const [maxAfterMeal, setMaxAfterMeal] = useState(0);

  useEffect(() => {
    let numberOfBeforeMeal = 0;
    const sumBeforeMeal = _.sumBy(props.glucoseResponse, (p) => {
      if (p.glucoseType === "Before meal") {
        numberOfBeforeMeal++;
        return p.glucoseLevel;
      }
    });

    const minBeforeMeal = _.minBy(props.glucoseResponse, (p) => {
      if (p.glucoseType === "Before meal") {
        return p.glucoseLevel;
      }
    });

    const maxBeforeMeal = _.maxBy(props.glucoseResponse, (p) => {
      if (p.glucoseType === "Before meal") {
        return p.glucoseLevel;
      }
    });

    setMaxBeforeMeal(maxBeforeMeal);
    setMinBeforeMeal(minBeforeMeal);
    setAverageBeforeMeal(sumBeforeMeal / numberOfBeforeMeal);
    setBeforeMealMesurrements(numberOfBeforeMeal);

    let numberOfAfterMeal = 0;
    const sumAfterMeal = _.sumBy(props.glucoseResponse, (p) => {
      if (p.glucoseType === "After meal") {
        numberOfAfterMeal++;
        return p.glucoseLevel;
      }
    });

    const minAafterMeal = _.minBy(props.glucoseResponse, (p) => {
      if (p.glucoseType === "After meal") {
        return p.glucoseLevel;
      }
    });

    const maxAfterMeal = _.maxBy(props.glucoseResponse, (p) => {
      if (p.glucoseType === "After meal") {
        return p.glucoseLevel;
      }
    });

    setMaxAfterMeal(minAafterMeal);
    setMinAfterMeal(maxAfterMeal);
    setAverageAfterMeal(sumAfterMeal / numberOfAfterMeal);
    setAfterMealMesurrements(numberOfAfterMeal);
  }, []);

  return (
    <React.Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Average</th>
            <th>Min value</th>
            <th>Max value</th>
            <th>Measurrements</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total</td>
            <td>
              {Math.round(
                (_.meanBy(props.glucoseResponse, "glucoseLevel") +
                  Number.EPSILON) *
                  100
              ) / 100}
            </td>
            <td>
              {_.minBy(props.glucoseResponse, "glucoseLevel").glucoseLevel}
            </td>
            <td>
              {" "}
              {_.maxBy(props.glucoseResponse, "glucoseLevel").glucoseLevel}
            </td>
            <td>{props.glucoseResponse.length}</td>
          </tr>
          <tr>
            <td>Before meal</td>
            <td>{averageBeforeMeal}</td>
            <td>
              {maxAfterMeal !== undefined ? minBeforeMeal.glucoseLevel : null}
            </td>
            <td>
              {maxAfterMeal !== undefined ? maxBeforeMeal.glucoseLevel : null}
            </td>
            <td>{beforeMealMesurrements}</td>
          </tr>
          <tr>
            <td>After meal</td>
            <td>{averageAfterMeal}</td>
            <td>
              {maxAfterMeal !== undefined ? minAfterMeal.glucoseLevel : null}
            </td>
            <td>
              {" "}
              {maxAfterMeal !== undefined ? maxAfterMeal.glucoseLevel : null}
            </td>
            <td> {afterMealMesurrements}</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
}

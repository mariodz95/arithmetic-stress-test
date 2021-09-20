import React, { useEffect, useState } from "react";
import { Button, ResponsiveEmbed } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { firebaseService } from "./../../services/firebaseService";
import PersonalInformation from "../profile/PersonalInformation";
import GlucoseLevels from "../glucoseData/GlucoseLevels";
import StressTestData from "../stressTestData/StressTestData";
import SmartDeviceGraph from "../smartDeviceGraph/SmartDeviceGraph";
import DatePicker from "react-datepicker";
import moment from "moment";
import _ from "lodash";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { Row, ButtonGroup } from "react-bootstrap";
import Statistic from "../statistic/Statistic";
import SmartDeviceStatistic from "../statistic/SmartDeviceStatistic";
import "react-datepicker/dist/react-datepicker.css";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function MyData() {
  const [personalData, setPersonalData] = useState();
  const { currentUser } = useAuth();
  const [displayTestData, setDisplayTestData] = useState(true);
  const [date, setDate] = useState(new Date());
  const [glucoseLevels, setGlucoseLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stressTestData, setStressTestData] = useState([]);
  let [color, setColor] = useState("#ffffff");
  const [smartDeviceData, setSmartDeviceData] = useState([]);
  const [glucoseResponse, setGlucoseResponse] = useState([]);
  const [smartDeviceResponse, setSmartDeviceResponse] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPersonalData();
    if (displayTestData) {
      getStressTestData();
      setLoading(false);
    } else {
      getGlucoseData();
      getSmartDeviceData();
      setLoading(false);
    }
  }, [displayTestData]);

  async function getPersonalData() {
    let response = await firebaseService.getPersonalData(currentUser.uid);
    setPersonalData(response);
  }

  const displayStressTestGraph = (value) => {
    setDisplayTestData(value);
  };

  const filterData = (displayTestData) => {
    setLoading(true);
    if (displayTestData) {
      getStressTestData();
    } else {
      getGlucoseData();
      getSmartDeviceData();
    }
    setLoading(false);
  };

  async function getSmartDeviceData() {
    let response = await firebaseService.getSmartDeviceData(
      currentUser.uid,
      date
    );

    setSmartDeviceResponse(response);
    let grouped = _.chain(response)
      .groupBy((result) => moment.unix(result["dateTime"]).startOf("day"))
      .map((entries, day) => [
        day.substring(0, 10),
        _.sumBy(entries, (entry) => entry.steps),
      ])
      .fromPairs()
      .value();

    const arr = Object.keys(grouped).map((key) => ({
      date: key,
      value: grouped[key],
    }));

    setSmartDeviceData(arr);
  }

  async function getGlucoseData() {
    let response = await firebaseService.getGlucoseData(currentUser.uid, date);

    let grouped = _.chain(response)
      .groupBy((result) => moment.unix(result["insertedDate"]).startOf("day"))
      .map((entries, day) => [
        day.substring(0, 10),
        _.meanBy(entries, (entry) => entry.glucoseLevel),
      ])
      .fromPairs()
      .value();

    const arr = Object.keys(grouped).map((key) => ({
      date: key,
      value: grouped[key],
    }));

    setGlucoseResponse(response);

    setGlucoseLevels(arr);
  }

  async function getStressTestData() {
    let response = await firebaseService.getStressTestData(
      currentUser.uid,
      date
    );
    setStressTestData(response);
  }

  return (
    <React.Fragment>
      <PersonalInformation personalData={personalData}></PersonalInformation>
      <Row className="row-btn">
        <p>Insert glucose level here:</p>
        <Link to="/data-form" className="btn btn-primary btn-glucose">
          Insert glucose data{" "}
        </Link>
        <p>Insert data from your smart device:</p>
        <Link
          to="/smartwatch-data-form"
          className="btn btn-primary btn-smart-device"
        >
          Insert smart watch data{" "}
        </Link>
      </Row>
      <br />
      <Row className="row-radio">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            onClick={() => displayStressTestGraph(true)}
          >
            Stress test
          </Button>
          <Button
            variant="secondary"
            onClick={() => displayStressTestGraph(false)}
          >
            Glucose levels
          </Button>
        </ButtonGroup>
      </Row>
      <br />
      <Row className="row-filter">
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          data-testid="date-element"
        />
        <Button
          className="btn-display"
          onClick={() => {
            filterData(displayTestData);
          }}
        >
          Display
        </Button>
      </Row>
      {loading ? (
        <ClipLoader color={color} loading={loading} css={override} size={150} />
      ) : (
        <React.Fragment>
          {console.log("test", stressTestData)},
          {displayTestData ? (
            stressTestData.length !== 0 ? (
              <StressTestData stressTestData={stressTestData}></StressTestData>
            ) : (
              <div className="no-data">
                <h2>"No stress test data!"</h2>
              </div>
            )
          ) : (
            <React.Fragment>
              {glucoseResponse.length !== 0 ? (
                <Statistic glucoseResponse={glucoseResponse}></Statistic>
              ) : null}

              {smartDeviceResponse.length !== 0 ? (
                <SmartDeviceStatistic
                  smartDeviceData={smartDeviceResponse}
                ></SmartDeviceStatistic>
              ) : null}
              {glucoseLevels.length !== 0 ? (
                <GlucoseLevels glucoseLevels={glucoseLevels}></GlucoseLevels>
              ) : (
                <div className="no-data">
                  <h2>No glucose data!</h2>
                </div>
              )}
              {smartDeviceData.length !== 0 ? (
                <SmartDeviceGraph
                  smartDeviceData={smartDeviceData}
                ></SmartDeviceGraph>
              ) : (
                <div className="no-data">
                  <h2>No smart device data!</h2>
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import "./PersonalInfromation.css";

export default function PersonalInformation(props) {
  return (
    <div className="personal-data">
      <h2>Personal data:</h2>
      <strong>Name: </strong>
      {props.personalData !== undefined ? (
        <React.Fragment>
          {props.personalData.name} {props.personalData.lastName}
        </React.Fragment>
      ) : (
        "No available data"
      )}
      <br />
      <strong>Date of birth: </strong>
      {props.personalData !== undefined
        ? props.personalData.dateOfBirth !== null
          ? Moment(
              new Date(props.personalData.dateOfBirth.seconds * 1000)
            ).format("YYYY-MM-DD")
          : null
        : "No available data"}
      <br />
      <strong>Type of diabetes: </strong>
      {props.personalData !== undefined
        ? props.personalData.typeOfDiabetes
        : "No available data"}
      <br />
      <strong>Weight: </strong>
      {props.personalData !== undefined
        ? props.personalData.weight
        : "No available data"}
      <br />
      <Link
        to={{
          pathname: "/update-personal-data",
          state: { currentUser: props.personalData },
        }}
      >
        Update Personal Data
      </Link>
    </div>
  );
}

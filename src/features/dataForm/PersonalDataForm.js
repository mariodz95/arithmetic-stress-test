import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Moment from "moment";
import { useAuth } from "../../context/AuthContext";
import firebase from "firebase/app";
import { UserData } from "./models/UserData";
import { firebaseService } from "./../../services/firebaseService";

export default function PersonalDataForm(props) {
  const nameRef = useRef();
  const lastNameRef = useRef();
  const typeOfDiabetesRef = useRef();
  const weightRef = useRef();
  const dateRef = useRef();
  const { currentUser } = useAuth();
  const [personalData, setPersonalData] = useState();
  const [formatedDate, setFormatedDate] = useState();

  useEffect(() => {
    setPersonalData(props.location.state.currentUser);
    if (props.location.state.currentUser !== undefined) {
      if (props.location.state.currentUser.dateOfBirth !== null) {
        var seconds =
          props.location.state.currentUser.dateOfBirth.seconds * 1000;
        var date = new Date(seconds);
        var formated = Moment(date).format("YYYY-MM-DD");
        setFormatedDate(formated);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user = new UserData(
      dateRef.current.value === ""
        ? null
        : firebase.firestore.Timestamp.fromDate(
            new Date(dateRef.current.value)
          ),
      lastNameRef.current.value,
      nameRef.current.value,
      typeOfDiabetesRef.current.value,
      weightRef.current.value
    );
    firebaseService.updatePersonalData(currentUser.uid, user);
  };

  return (
    <div className="personal-data-form">
      <h2 className="text-center mb-4">Personal information</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            data-testid="name-element"
            type="text"
            placeholder="Enter name"
            ref={nameRef}
            defaultValue={personalData !== undefined ? personalData.name : null}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            data-testid="last-name-element"
            type="text"
            placeholder="Enter last name"
            ref={lastNameRef}
            defaultValue={
              personalData !== undefined ? personalData.lastName : null
            }
          />
        </Form.Group>
        <Form.Group controlId="typeOfDiabetes">
          <Form.Label>Type of diabetes:</Form.Label>
          <Form.Control
            as="select"
            ref={typeOfDiabetesRef}
            data-testid="typeOfDiabetes-element"
          >
            <option value="0">Choose...</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBirthOfDate">
          <Form.Label>Date of birth:</Form.Label>
          <Form.Control
            data-testid="date-element"
            type="date"
            ref={dateRef}
            defaultValue={personalData !== undefined ? formatedDate : null}
          />
        </Form.Group>
        <Form.Group controlId="formWeight">
          <Form.Label>Weight:</Form.Label>
          <Form.Control
            data-testid="wight-element"
            type="number"
            placeholder="Weight in kg"
            ref={weightRef}
            defaultValue={
              personalData !== undefined ? personalData.weight : null
            }
          />
        </Form.Group>
        <div className="center">
          <Button className="text-center" variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

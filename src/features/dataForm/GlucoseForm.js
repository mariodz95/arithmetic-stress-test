import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { firebaseService } from "../../services/firebaseService";
import { GlucoseLevel } from "./models/GlucoseLevel";
import firebase from "firebase/app";

export default function GlucoseForm() {
  const glucoseRef = useRef();
  const glucoseType = useRef();
  const history = useHistory();
  const { currentUser } = useAuth();
  const dateRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    let glucoseLevel = new GlucoseLevel(
      glucoseRef.current.value,
      glucoseType.current.value,
      firebase.firestore.Timestamp.fromDate(new Date(dateRef.current.value))
    );

    firebaseService.insertGlucoseData(currentUser.uid, glucoseLevel);
    history.push("/my-data");
  };

  return (
    <React.Fragment>
      <div className="center">
        <h1>Glucose form</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGlucoseLevel">
          <Form.Label>Glucose level</Form.Label>
          <Form.Control
            data-testid="glucose-element"
            required
            type="text"
            pattern="^\d*(\.\d{0,2})?$"
            placeholder="Enter glucose level in  mmol"
            ref={glucoseRef}
          />
        </Form.Group>
        <Form.Group controlId="typeSelect">
          <Form.Label>Select</Form.Label>
          <Form.Control
            as="select"
            ref={glucoseType}
            required
            data-testid="type-element"
          >
            <option>Before meal</option>
            <option>After meal</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            ref={dateRef}
            required
            data-testid="date-element"
          />
        </Form.Group>
        <div className="center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
}

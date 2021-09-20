import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { firebaseService } from "../../services/firebaseService";
import { SmartDevice } from "./models/SmartDevice";
import firebase from "firebase/app";

export default function ActivityFormData() {
  const heartRateRef = useRef();
  const distanceRef = useRef();
  const numberOfStepsRef = useRef();
  const calorieRef = useRef();
  const history = useHistory();
  const dateRef = useRef();
  const timeDurationRef = useRef();
  const { currentUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    let smartDevice = new SmartDevice(
      calorieRef.current.value,
      distanceRef.current.value,
      timeDurationRef.current.value,
      heartRateRef.current.value,
      numberOfStepsRef.current.value,
      firebase.firestore.Timestamp.fromDate(new Date(dateRef.current.value))
    );

    firebaseService.insertSmartDeviceData(currentUser.uid, smartDevice);

    history.push("/my-data");
  };

  return (
    <div>
      <div className="center">
        <h1>Smartwatch form</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicHeartRate">
          <Form.Label>Heart rate</Form.Label>
          <Form.Control
            data-testid="heartRate-element"
            type="number"
            placeholder="Heart rate"
            ref={heartRateRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicDistance">
          <Form.Label>Distance</Form.Label>
          <Form.Control
            data-testid="distance-element"
            type="number"
            placeholder="Distance in km"
            ref={distanceRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicNumberOfSteps">
          <Form.Label>Number of steps</Form.Label>
          <Form.Control
            data-testid="numberOfSteps-element"
            type="number"
            placeholder="Number of steps"
            ref={numberOfStepsRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicCalorie">
          <Form.Label>Calorie</Form.Label>
          <Form.Control
            data-testid="calorie-element"
            type="number"
            placeholder="Calories"
            ref={calorieRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTimeDuration">
          <Form.Label>Duration time</Form.Label>
          <Form.Control
            data-testid="duration-element"
            type="number"
            placeholder="Time duration in minutes"
            ref={timeDurationRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            data-testid="date-element"
            type="datetime-local"
            ref={dateRef}
            required
            data-testid="glucose-element"
          />
        </Form.Group>
        <div className="center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

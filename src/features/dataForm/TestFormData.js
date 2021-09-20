import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TestData } from "./models/TestData";
import { useAuth } from "../../context/AuthContext";
import { firebaseService } from "./../../services/firebaseService";

export default function TestFormData(props) {
  const glucoseRef = useRef();
  const heartRateRef = useRef();
  const stressLevelRef = useRef();
  const history = useHistory();
  const { currentUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const beforeTestData = JSON.parse(localStorage.getItem("testData"));

    if (props.resultPage === true) {
      let afterTestData = new TestData(
        glucoseRef.current.value === "" ? null : glucoseRef.current.value,
        heartRateRef.current.value === "" ? null : heartRateRef.current.value,
        stressLevelRef.current.value === ""
          ? null
          : stressLevelRef.current.value
      );
      firebaseService.insertTestDataGlucose(
        currentUser.uid,
        beforeTestData,
        afterTestData
      );
      props.handleClose();
    } else {
      let testData = new TestData(
        glucoseRef.current.value === "" ? null : glucoseRef.current.value,
        heartRateRef.current.value === "" ? null : heartRateRef.current.value,
        stressLevelRef.current.value === ""
          ? null
          : stressLevelRef.current.value
      );
      localStorage.setItem("testData", JSON.stringify(testData));
      props.handleClose();
    }
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGlucoseLevel">
          <Form.Label>Glucose level: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter glucose level in mmol"
            ref={glucoseRef}
            required
            data-testid="glucose-level-input"
          />
        </Form.Group>
        <Form.Group controlId="formHeartRate">
          <Form.Label>Heart rate:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter heart rate from watch"
            ref={heartRateRef}
            data-testid="heart-rate-input"
          />
        </Form.Group>
        <Form.Group controlId="formStressLevel">
          <Form.Label>Stress level from watch: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter stress level from watch"
            ref={stressLevelRef}
            data-testid="stress-level-input"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}

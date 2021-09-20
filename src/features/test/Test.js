import React, { useState } from "react";
import {
  Button,
  Row,
  Form,
  Col,
  ButtonGroup,
  Container,
} from "react-bootstrap";
import Timer from "./Timer";
import Modal from "react-bootstrap/Modal";
import TestFormData from "../dataForm/TestFormData";
import { useAuth } from "../../context/AuthContext";

import "./Test.css";

export default function Test() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [difficulty, setDifficulty] = useState(7);
  const [quizTime, setQuizTime] = useState(180);
  const [show, setShow] = useState(false);
  const { currentUser } = useAuth();

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleChecked = (e) => {
    setQuizTime(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="test-page">
        {startQuiz ? null : (
          <React.Fragment>
            <h2>Arithmetic stress test</h2>
            <>
              {currentUser !== null ? (
                <React.Fragment>
                  <p className="txt-before-test txt">
                    For tracking glucose level and how stress affects it insert
                    glucose in blood before the test:
                  </p>
                  <Button variant="primary" onClick={handleShow}>
                    Insert glucose
                  </Button>
                </React.Fragment>
              ) : null}

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Glucose form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <TestFormData handleClose={handleClose}></TestFormData>
                </Modal.Body>
              </Modal>
            </>
          </React.Fragment>
        )}
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "70vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            {startQuiz ? (
              <Timer
                seconds={difficulty}
                durationTime={quizTime}
                // testData={props.location.testData}
              />
            ) : (
              <React.Fragment>
                <p className="txt">
                  Default chosen weight is easy. That means that every 7 seconds
                  new number will be generated. For medium, that time is 5
                  seconds and for hard is 3 seconds. You can also choose the
                  time duration of the test. You can submit your answer by
                  pressing enter or waiting for the timer to pass.
                </p>
                <ButtonGroup
                  aria-label="Basic example"
                  onClick={(e) => handleDifficultyChange(e)}
                >
                  <Button variant="secondary" value={7}>
                    Easy
                  </Button>
                  <Button variant="secondary" value={5}>
                    Medium
                  </Button>
                  <Button variant="secondary" value={3}>
                    Hard
                  </Button>
                </ButtonGroup>
                <fieldset>
                  <Form.Group as={Row} onChange={(e) => handleChecked(e)}>
                    <Form.Label as="legend" column sm={2}>
                      Time:
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        defaultChecked
                        type="radio"
                        value={180}
                        label="3 minutes"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                      />
                      <Form.Check
                        type="radio"
                        label="5 minutes"
                        value={300}
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                      />
                      <Form.Check
                        type="radio"
                        label="7 minutes"
                        value={420}
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
                <Button onClick={() => setStartQuiz(true)}>Start Quiz</Button>
              </React.Fragment>
            )}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

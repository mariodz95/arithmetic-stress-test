import React, { useEffect, useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { firebaseService } from "./../../services/firebaseService";
import TestFormData from "../dataForm/TestFormData";
import Moment from "moment";

export default function Result() {
  const [questions, setQuestions] = useState(0);
  const [result, setResult] = useState(0);
  const [show, setShow] = useState(false);
  const [results, setResults] = useState(0);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    setQuestions(localStorage.getItem("questions"));
    setResult(localStorage.getItem("score"));
    getAllTestResults();
  }, []);

  async function getAllTestResults() {
    let response = await firebaseService.getAllTestResults();
    setResults(response);
  }

  return (
    <React.Fragment>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="result w-100" style={{ maxWidth: "400px" }}>
          <h1>
            Your score is: {result} of {questions}
          </h1>
          <>
            <Button variant="primary" onClick={handleShow}>
              Insert glucose
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Glucose form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TestFormData
                  handleClose={handleClose}
                  resultPage={true}
                ></TestFormData>
              </Modal.Body>
            </Modal>
          </>
          <h1>Results</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Duration time</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results !== 0
                ? results.map((item) => {
                    return (
                      <React.Fragment>
                        <tr>
                          <td>{item.userEmail}</td>
                          <td>{item.durationTime / 60}</td>
                          <td>
                            {item.testScore} / {item.testQuestions}
                          </td>
                          <td>
                            {" "}
                            {Moment(
                              new Date(item.dateInserted.seconds * 1000)
                            ).format("YYYY-MM-DD")}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                : null}
            </tbody>
          </Table>{" "}
        </div>
      </Container>
    </React.Fragment>
  );
}

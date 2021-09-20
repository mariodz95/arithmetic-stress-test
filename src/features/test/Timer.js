import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { firebaseService } from "./../../services/firebaseService";
import { StressTestObject } from "./StressTestObject";
import "./Test.css";

export default function Timer(props) {
  const { currentUser } = useAuth();
  const resultRef = useRef();
  const [timeLeft, setTimeLeft] = useState(props.seconds);
  const [durationTime, setDurationTime] = useState(props.durationTime);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [firstNumber, setFirstNumber] = React.useState(
    Math.floor(Math.random() * (999 - 100 + 1) + 100)
  );
  const [secondNumber, setSecondNumber] = React.useState(
    Math.floor(Math.random() * (999 - 100 + 1) + 100)
  );
  const history = useHistory();

  let audio = new Audio("/wrong.mp3");

  //Veliki timer
  useEffect(() => {
    // exit early when we reach 0
    if (!durationTime) {
      if (currentUser != null) {
        let stressTestObject = new StressTestObject(
          score,
          questions,
          currentUser.email,
          Number(props.durationTime),
          new Date()
        );

        firebaseService.saveStressTestResult(stressTestObject);
      }
      localStorage.setItem("questions", questions);
      localStorage.setItem("score", score);

      history.push({
        pathname: "/result",
      });
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setDurationTime(durationTime - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [durationTime]);

  //Manji timer
  useEffect(() => {
    if (!durationTime) {
      setTimeLeft(0);
      return;
    }

    if (timeLeft < 0) {
      setQuestions(questions + 1);
      checkIfIsCorrect();
      audio.play();
      setTimeLeft(props.seconds);
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  //Postavljanje prvo nasumičnog broja
  useEffect(() => {
    if (!durationTime) {
      return;
    }
    const interval = setInterval(
      () => setFirstNumber(Math.floor(Math.random() * (999 - 100 + 1) + 100)),
      props.seconds * 1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [firstNumber]);

  //Postavljanje drugog nasumičnog broja
  useEffect(() => {
    if (!durationTime) {
      return;
    }
    const interval = setInterval(
      () => setSecondNumber(Math.floor(Math.random() * (999 - 100 + 1) + 100)),
      props.seconds * 1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [secondNumber]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setQuestions(questions + 1);
      checkIfIsCorrect();
    }
  };

  const checkIfIsCorrect = () => {
    let first = firstNumber > secondNumber ? firstNumber : secondNumber;
    let second = firstNumber < secondNumber ? firstNumber : secondNumber;
    let correctResult = first - second;
    if (resultRef.current.value == correctResult) {
      setScore(score + 1);
      generateNumbers();
    } else {
      generateNumbers();
    }
  };

  const generateNumbers = () => {
    setTimeout(() => {
      audio.play();
      setFirstNumber(Math.floor(Math.random() * (999 - 100 + 1) + 100));
      setSecondNumber(Math.floor(Math.random() * (999 - 100 + 1) + 100));
      setTimeLeft(props.seconds);
      resultRef.current.value = "";
    }, 100);
  };

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <div className="quiz-box">
      <p className="stressTestDuration">
        {millisToMinutesAndSeconds(durationTime * 1000)}
      </p>
      <p className="newNumber">{timeLeft}</p>
      <p className="score">Score: {score}</p>
      <Row>
        <Col md="auto">
          <p className="numbers">
            {firstNumber > secondNumber ? firstNumber : secondNumber} -{" "}
            {firstNumber < secondNumber ? firstNumber : secondNumber} =
          </p>
        </Col>
        <Col>
          <input
            data-testid="result-input"
            type="number"
            ref={resultRef}
            onKeyDown={(e) => {
              handleKeyPress(e);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

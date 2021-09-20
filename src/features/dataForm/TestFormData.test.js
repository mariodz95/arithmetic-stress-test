import TestFormData from "./TestFormData";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { act } from "react-dom/test-utils";
import { firebaseService } from "./../../services/firebaseService";
import React from "react";

it("renders without crashing", () => {
  const submit = jest.fn();
  const handleClose = jest.fn();

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ submit }}>
        <TestFormData handleClose={handleClose}></TestFormData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Glucose level:")).toBeTruthy();
  expect(getByText("Heart rate:")).toBeTruthy();
  expect(getByText("Stress level from watch:")).toBeTruthy();
  expect(getByTestId("glucose-level-input")).toBeTruthy();
  expect(getByTestId("heart-rate-input")).toBeTruthy();
  expect(getByTestId("stress-level-input")).toBeTruthy();
});

it("save data on submit click", async () => {
  const submit = jest.fn();
  const handleClose = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ submit }}>
        <TestFormData handleClose={handleClose}></TestFormData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);

  await act(async () => {
    expect(submit).toHaveBeenCalledTimes(0);
  });
});

it("save data on submit click", async () => {
  const submit = jest.fn();
  const handleClose = jest.fn();

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ submit }}>
        <TestFormData handleClose={handleClose}></TestFormData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const glucoseLevel = getByTestId("glucose-level-input");
  const heartRate = getByTestId("heart-rate-input");
  const stressLevel = getByTestId("stress-level-input");

  fireEvent.change(glucoseLevel, { target: { value: "ss" } });
  fireEvent.change(heartRate, { target: { value: "ss" } });
  fireEvent.change(stressLevel, { target: { value: "ss" } });

  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);

  await act(async () => {
    expect(submit).toHaveBeenCalledTimes(0);
  });
});

it("save data on submit click if is on result page", async () => {
  const currentUser = jest.fn();
  const handleClose = jest.fn();

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <TestFormData
          resultPage={true}
          handleClose={handleClose}
        ></TestFormData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const glucoseLevel = getByTestId("glucose-level-input");
  const heartRate = getByTestId("heart-rate-input");
  const stressLevel = getByTestId("stress-level-input");

  fireEvent.change(glucoseLevel, { target: { value: "ss" } });
  fireEvent.change(heartRate, { target: { value: "ss" } });
  fireEvent.change(stressLevel, { target: { value: "ss" } });

  jest
    .spyOn(firebaseService, "insertTestDataGlucose")
    .mockImplementation(() => Promise.resolve());

  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);
});

it("save data on submit click if is on result page", async () => {
  const currentUser = jest.fn();
  const handleClose = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <TestFormData
          resultPage={true}
          handleClose={handleClose}
        ></TestFormData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  jest
    .spyOn(firebaseService, "insertTestDataGlucose")
    .mockImplementation(() => Promise.resolve());

  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);
});

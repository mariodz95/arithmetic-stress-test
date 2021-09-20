import PersonalDataForm from "./PersonalDataForm";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { firebaseService } from "./../../services/firebaseService";
import React from "react";

it("renders without crashing", () => {
  const submit = jest.fn();

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ submit }}>
        <PersonalDataForm location={{ state: "" }}></PersonalDataForm>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Personal information")).toBeTruthy();
  expect(getByText("Name:")).toBeTruthy();
  expect(getByText("Last name:")).toBeTruthy();
  expect(getByText("Type of diabetes:")).toBeTruthy();
  expect(getByText("Date of birth:")).toBeTruthy();
  expect(getByText("Weight:")).toBeTruthy();
  expect(getByText("Submit")).toBeTruthy();

  expect(getByTestId("name-element")).toBeTruthy();
  expect(getByTestId("last-name-element")).toBeTruthy();
  expect(getByTestId("typeOfDiabetes-element")).toBeTruthy();
  expect(getByTestId("date-element")).toBeTruthy();
  expect(getByTestId("wight-element")).toBeTruthy();
});

it("update should pass without error", async () => {
  const updatePersonalData = jest.fn();
  const currentUser = jest.fn();
  const submit = jest.fn();

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ updatePersonalData, currentUser, submit }}>
        <PersonalDataForm location={{ state: "" }}></PersonalDataForm>
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const date = getByTestId("date-element");

  fireEvent.change(date, { target: { value: "30/06/1995" } });

  jest.spyOn(firebaseService, "updatePersonalData");
  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);
});

it("update if date exist", async () => {
  const updatePersonalData = jest.fn();
  const currentUser = jest.fn();
  const submit = jest.fn();

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ updatePersonalData, currentUser, submit }}>
        <PersonalDataForm
          location={{ state: { currentUser: { dateOfBirth: "66" } } }}
        ></PersonalDataForm>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const date = getByTestId("date-element");

  fireEvent.change(date, { target: { value: "30/06/1995" } });

  jest.spyOn(firebaseService, "updatePersonalData");
  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);
});

it("format date if exist", async () => {
  const submit = jest.fn();
  const currentUser = jest.fn();

  const { getByTestId, getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ submit, currentUser }}>
        <PersonalDataForm
          location={{ state: { currentUser: { dateOfBirth: "" } } }}
        ></PersonalDataForm>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const date = getByTestId("date-element");

  fireEvent.change(date, { target: { value: "33" } });
  jest.spyOn(firebaseService, "updatePersonalData");
  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);
});

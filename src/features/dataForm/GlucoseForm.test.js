import GlucoseForm from "./GlucoseForm";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { firebaseService } from "./../../services/firebaseService";

it("renders without crashing", () => {
  const currentUser = jest.fn();
  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <GlucoseForm></GlucoseForm>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Glucose form")).toBeTruthy();
  expect(getByText("Glucose level")).toBeTruthy();
  expect(getByText("Select")).toBeTruthy();
  expect(getByText("Date")).toBeTruthy();

  expect(getByTestId("glucose-element")).toBeTruthy();
  expect(getByTestId("type-element")).toBeTruthy();
  expect(getByTestId("date-element")).toBeTruthy();
});

it("submit on button click", () => {
  const currentUser = jest.fn();
  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <GlucoseForm></GlucoseForm>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  jest.spyOn(firebaseService, "insertGlucoseData");
  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);
});

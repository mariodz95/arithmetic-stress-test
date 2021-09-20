import ActivityFormData from "./ActivityFormData";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { firebaseService } from "./../../services/firebaseService";

it("renders without crashing", () => {
  const currentUser = jest.fn();
  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <ActivityFormData></ActivityFormData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Smartwatch form")).toBeTruthy();
  expect(getByText("Heart rate")).toBeTruthy();
  expect(getByText("Distance")).toBeTruthy();
  expect(getByText("Number of steps")).toBeTruthy();
  expect(getByText("Calorie")).toBeTruthy();
  expect(getByText("Duration time")).toBeTruthy();
  expect(getByText("Date")).toBeTruthy();

  expect(getByTestId("heartRate-element")).toBeTruthy();
  expect(getByTestId("distance-element")).toBeTruthy();
  expect(getByTestId("numberOfSteps-element")).toBeTruthy();
  expect(getByTestId("calorie-element")).toBeTruthy();
  expect(getByTestId("duration-element")).toBeTruthy();
});

it("submit on button click", () => {
  const currentUser = jest.fn();
  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <ActivityFormData></ActivityFormData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  jest.spyOn(firebaseService, "insertSmartDeviceData");
  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);
});

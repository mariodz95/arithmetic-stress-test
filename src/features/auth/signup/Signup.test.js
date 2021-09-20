import Signup from "./Signup";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../../context/AuthContext";
import { act } from "react-dom/test-utils";

it("renders without crashing", () => {
  const resetPassword = jest.fn();

  const { getByLabelText, getByText, getAllByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ resetPassword }}>
        <Signup></Signup>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Password")).toBeTruthy();
  expect(getAllByText("Sign Up")).toBeTruthy();
  expect(getAllByText("Already have an account?")).toBeTruthy();
  expect(getAllByText("Log in")).toBeTruthy();

  expect(getByTestId("email-input")).toBeTruthy();
  expect(getByTestId("password-input")).toBeTruthy();
  expect(getByTestId("password-confirmation-input")).toBeTruthy();
});

it("sing up  should pass without error", async () => {
  const signup = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ signup }}>
        <Signup></Signup>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const signupButton = getByText("Sign Up");
  fireEvent.click(signupButton);

  await act(async () => {
    expect(signup).toHaveBeenCalledTimes(1);
  });
});

test("sign up should catch error", () => {
  const signup = () => {
    throw new TypeError("Failed to sing up");
  };

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ signup }}>
        <Signup></Signup>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const signupButton = getByText("Sign Up");
  fireEvent.click(signupButton);

  expect(() => {
    signup();
  }).toThrow("Failed to sing up");
});

test("password and password confirmation doesn't match should return from function", () => {
  const signup = jest.fn();

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ signup }}>
        <Signup></Signup>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const passwordInput = getByTestId("password-input");
  const passwordConfirmationInput = getByTestId("password-confirmation-input");

  fireEvent.change(passwordInput, { target: { value: "test1234" } });
  fireEvent.change(passwordConfirmationInput, {
    target: { value: "asdasd" },
  });

  const signupButton = getByText("Sign Up");
  fireEvent.click(signupButton);
});

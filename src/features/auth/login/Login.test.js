import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../../context/AuthContext";
import { act } from "react-dom/test-utils";

it("renders without crashing", () => {
  const login = jest.fn();

  const { getByLabelText, getByText, getAllByText, getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ login }}>
        <Login></Login>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByTestId("email-element")).toBeTruthy();
  expect(getByLabelText("Password")).toBeTruthy();
  expect(getByText("Log In")).toBeTruthy();
  expect(getByText("Forgot Password?")).toBeTruthy();
  expect(getAllByText("Need an account?")).toBeTruthy();
  expect(getAllByText("Sing Up")).toBeTruthy();
  expect(getByTestId("email-input")).toBeTruthy();
  expect(getByTestId("password-input")).toBeTruthy();
});

it("email and paswword input updates on change", () => {
  const login = jest.fn();

  const { getByTestId } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ login }}>
        <Login></Login>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const emailInput = getByTestId("email-input");
  const passwordInput = getByTestId("password-input");

  fireEvent.change(emailInput, { target: { value: "mariodz95@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "test1234" } });

  expect(emailInput.value).toBe("mariodz95@gmail.com");
  expect(passwordInput.value).toBe("test1234");
});

it("log in should pass without error", async () => {
  const login = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ login }}>
        <Login></Login>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);

  await act(async () => {
    expect(login).toHaveBeenCalledTimes(1);
  });
});

it("log in should catch error", () => {
  const login = () => {
    throw new TypeError("Failed to sign in");
  };

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ login }}>
        <Login></Login>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);

  expect(() => {
    login();
  }).toThrow("Failed to sign in");
});

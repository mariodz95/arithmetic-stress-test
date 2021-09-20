import ForgotPassword from "./ForgotPassword";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../../context/AuthContext";
import { act } from "react-dom/test-utils";

it("renders without crashing", () => {
  const resetPassword = jest.fn();

  const { getByLabelText, getByText, getAllByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ resetPassword }}>
        <ForgotPassword></ForgotPassword>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Password Reset")).toBeTruthy();
  expect(getByLabelText("E-mail")).toBeTruthy();
  expect(getByText("Reset Password")).toBeTruthy();
  expect(getAllByText("Login")).toBeTruthy();
  expect(getAllByText("Need an account?")).toBeTruthy();
  expect(getAllByText("Sing Up")).toBeTruthy();
});

it("it should pass", async () => {
  const resetPassword = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ resetPassword }}>
        <ForgotPassword></ForgotPassword>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const ressetButton = getByText("Reset Password");
  fireEvent.click(ressetButton);

  await act(async () => {
    expect(resetPassword).toHaveBeenCalledTimes(1);
  });
});

test("the reset password fails with an error", () => {
  const resetPassword = () => {
    throw new TypeError("Failed to reset password");
  };

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ resetPassword }}>
        <ForgotPassword></ForgotPassword>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const submitButton = getByText("Reset Password");
  fireEvent.click(submitButton);

  expect(() => {
    resetPassword();
  }).toThrow("Failed to reset password");
});

describe("Input value", () => {
  it("email and paswword input updates on change", () => {
    const resetPassword = jest.fn();

    const { getByTestId } = render(
      <BrowserRouter>
        <AuthContext.Provider value={{ resetPassword }}>
          <ForgotPassword></ForgotPassword>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const emailInput = getByTestId("email-input");

    fireEvent.change(emailInput, { target: { value: "mariodz95@gmail.com" } });

    expect(emailInput.value).toBe("mariodz95@gmail.com");
  });
});

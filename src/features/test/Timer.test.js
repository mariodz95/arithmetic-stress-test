import Timer from "./Timer";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { act } from "react-dom/test-utils";
import { firebaseService } from "./../../services/firebaseService";
import React from "react";

it("renders without crashing", async () => {
  const user = jest.fn();
  jest.useFakeTimers();

  await act(async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <Timer></Timer>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });

  jest.advanceTimersByTime(-1);
});

it("renders without crashing if currenbt user is not null", async () => {
  const currentUser = jest.fn();
  const durationTime = jest.fn();
  const timeLeft = jest.fn();

  jest.useFakeTimers();

  durationTime.mockImplementation(0);
  timeLeft.mockImplementation(-2);

  jest
    .spyOn(firebaseService, "saveStressTestResult")
    .mockImplementation(() => Promise.resolve());

  const { getByText, getAllByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser, durationTime, timeLeft }}>
        <Timer></Timer>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  act(() => {
    jest.advanceTimersByTime(100000);
  });
});

it("input value properly", async () => {
  const user = jest.fn();

  await act(async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <Timer></Timer>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const resultInput = getByTestId("result-input");
    fireEvent.change(resultInput, { target: { value: "2" } });

    expect(resultInput.value).toBe("2");
  });
});

it("press enter1", async () => {
  const user = jest.fn();

  await act(async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <Timer></Timer>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const resultInput = getByTestId("result-input");
    fireEvent.change(resultInput, { target: { value: "2" } });

    expect(resultInput.value).toBe("2");
  });
});

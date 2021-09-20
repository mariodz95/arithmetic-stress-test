import Test from "./Test";
import { BrowserRouter } from "react-router-dom";
import {
  render,
  fireEvent,
  queryByAttribute,
  getAllByRole,
} from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { act } from "react-dom/test-utils";

it("renders without crashing", () => {
  const btn = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ btn }}>
        <Test></Test>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Insert glucose")).toBeTruthy();
  expect(getByText("Easy")).toBeTruthy();
  expect(getByText("Medium")).toBeTruthy();
  expect(getByText("Hard")).toBeTruthy();
  expect(getByText("Start Quiz")).toBeTruthy();
});

it("should redirect to login if user has not been autheticated", () => {
  const currentUser = jest.fn();
  currentUser.mockReturnValueOnce(null);

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <Test></Test>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

it("start quiz button click", async () => {
  const startQuiz = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ startQuiz }}>
        <Test></Test>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const startQuizButton = getByText("Start Quiz");
  fireEvent.click(startQuizButton);

  await act(async () => {
    expect(startQuiz).toHaveBeenCalledTimes(0);
  });
});

it("click insert glucose button", async () => {
  const insertGlucose = jest.fn();

  const { getByText, container } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ insertGlucose }}>
        <Test></Test>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const insertGlucoseBtn = getByText("Insert glucose");
  fireEvent.click(insertGlucoseBtn);

  const closeButton = getByText("×");
  fireEvent.click(closeButton);

  await act(async () => {
    expect(insertGlucose).toHaveBeenCalledTimes(0);
  });
});

it("test weight buttons", async () => {
  const btn = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ btn }}>
        <Test></Test>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const easyBtn = getByText("Easy");
  fireEvent.click(easyBtn);

  const mediumBtn = getByText("Medium");
  fireEvent.click(mediumBtn);

  const hardBtn = getByText("Hard");
  fireEvent.click(hardBtn);

  expect(btn).toHaveBeenCalledTimes(0);
});

it("time duration change", async () => {
  const currentUser = jest.fn();

  const { getByLabelText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <Test location={""}></Test>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const labelRadio1 = getByLabelText("3 minutes");
  const labelRadio2 = getByLabelText("5 minutes");
  const labelRadio3 = getByLabelText("7 minutes");

  fireEvent.click(labelRadio1);
  expect(labelRadio1.checked).toEqual(true);
  expect(labelRadio2.checked).toEqual(false);
  expect(labelRadio3.checked).toEqual(false);

  fireEvent.click(labelRadio2);
  expect(labelRadio1.checked).toEqual(false);
  expect(labelRadio2.checked).toEqual(true);
  expect(labelRadio3.checked).toEqual(false);

  fireEvent.click(labelRadio3);
  expect(labelRadio1.checked).toEqual(false);
  expect(labelRadio2.checked).toEqual(false);
  expect(labelRadio3.checked).toEqual(true);
});

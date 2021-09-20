import MyData from "./MyData";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { firebaseService } from "./../../services/firebaseService";
import { act } from "react-dom/test-utils";
import * as _ from "lodash";

const spyOrderByLodash = jest.spyOn(_, "groupBy");

it("renders without crashing", async () => {
  const currentUser = jest.fn();

  jest
    .spyOn(firebaseService, "getPersonalData")
    .mockImplementation(() => Promise.resolve());
  jest
    .spyOn(firebaseService, "getStressTestData")
    .mockImplementation(() => Promise.resolve());
  jest.spyOn(_, "chain");

  jest.spyOn(firebaseService, "getSmartDeviceData");

  await act(async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ currentUser }}>
          <MyData></MyData>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });
});

it("renders without crashing", async () => {
  const currentUser = jest.fn();
  const displayTestData = jest.fn().mockImplementation(false);
  displayTestData.mockReturnValueOnce(null);
  jest.spyOn(_, "chain");

  jest.spyOn(firebaseService, "getSmartDeviceData").mockReturnValueOnce([
    {
      calories: 75,
      dateTime: { seconds: 1619113560, nanoseconds: 0 },
      distance: 3,
      heartRate: 92,
      durationTimeMinutes: 49,
      steps: 2500,
    },
    {
      durationTimeMinutes: 120,
      heartRate: 85,
      dateTime: { seconds: 1619196900, nanoseconds: 0 },
      steps: 6500,
      distance: 5,
      calories: 115,
    },
  ]);

  await act(async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ currentUser, displayTestData }}>
          <MyData></MyData>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });
});

it("click on glucose levels", async () => {
  const stressTestData = jest.fn();
  const currentUser = jest.fn();

  jest.spyOn(firebaseService, "getGlucoseData").mockReturnValueOnce([
    {
      glucoseLevel: 4,
      glucoseType: "Before meal",
      insertedDate: { seconds: 1619097000, nanoseconds: 0 },
    },
    {
      glucoseType: "After meal",
      glucoseLevel: 6,
      insertedDate: { seconds: 1619183340, nanoseconds: 0 },
    },
    {
      insertedDate: { seconds: 1619183340, nanoseconds: 0 },
      glucoseType: "Before meal",
      glucoseLevel: 5,
    },
  ]);
  jest.spyOn(firebaseService, "getSmartDeviceData").mockReturnValueOnce([
    {
      durationTimeMinutes: 49,
      calories: 75,
      dateTime: { seconds: 1619113560, nanoseconds: 0 },
      steps: 2500,
      heartRate: 92,
      distance: 3,
    },
    {
      calories: 115,
      steps: 6500,
      dateTime: { seconds: 1619196900, nanoseconds: 0 },
      distance: 5,
      heartRate: 85,
      durationTimeMinutes: 120,
    },
  ]);

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ stressTestData, currentUser }}>
        <MyData></MyData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const stressTestDataButton = getByText("Glucose levels");

  await act(async () => {
    fireEvent.click(stressTestDataButton);
  });
});

it("click on stress test", async () => {
  const stressTestData = jest.fn();
  const currentUser = jest.fn();
  jest.spyOn(_, "chain");

  jest.spyOn(firebaseService, "getGlucoseData");
  jest.spyOn(firebaseService, "getSmartDeviceData");

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ stressTestData, currentUser }}>
        <MyData></MyData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const stressTestDataButton = getByText("Stress test");
  await act(async () => {
    fireEvent.click(stressTestDataButton);
  });
});

it("click display button", async () => {
  const stressTestData = jest.fn();
  const currentUser = jest.fn();
  jest.spyOn(_, "chain");

  jest.spyOn(firebaseService, "getGlucoseData");
  jest.spyOn(firebaseService, "getSmartDeviceData");

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ stressTestData, currentUser }}>
        <MyData></MyData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const stressTestDataButton = getByText("Display");
  await act(async () => {
    fireEvent.click(stressTestDataButton);
  });
});

// it("click date picker button", async () => {
//   const stressTestData = jest.fn();
//   const currentUser = jest.fn();

//   jest.spyOn(firebaseService, "getGlucoseData");
//   jest.spyOn(firebaseService, "getSmartDeviceData");

//   const { getByText, getByTestId, querySelector } = render(
//     <BrowserRouter>
//       <AuthContext.Provider value={{ stressTestData, currentUser }}>
//         <MyData></MyData>
//       </AuthContext.Provider>
//     </BrowserRouter>
//   );

//   const stressTestDataButton = querySelector("text");
//   await act(async () => {
//     fireEvent.click(stressTestDataButton);
//   });
// });

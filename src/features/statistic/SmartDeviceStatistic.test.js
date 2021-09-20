import SmartDeviceStatistic from "./SmartDeviceStatistic";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";

it("renders without crashing", () => {
  const data = [
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
  ];
  render(
    <BrowserRouter>
      <AuthContext.Provider>
        <SmartDeviceStatistic smartDeviceData={data}></SmartDeviceStatistic>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

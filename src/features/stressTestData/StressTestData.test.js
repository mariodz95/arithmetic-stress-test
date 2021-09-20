import StressTestData from "./StressTestData";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";

it("renders without crashing", () => {
  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider>
        <StressTestData></StressTestData>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Stress test data")).toBeTruthy();
});

import GlucoseLevels from "./GlucoseLevels";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";

it("renders without crashing", () => {
  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider>
        <GlucoseLevels></GlucoseLevels>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Glucose levels")).toBeTruthy();
});

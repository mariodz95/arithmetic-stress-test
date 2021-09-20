import SmartDeviceGraph from "./SmartDeviceGraph";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { act } from "react-dom/test-utils";

it("renders without crashing", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider>
          <SmartDeviceGraph></SmartDeviceGraph>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });
});

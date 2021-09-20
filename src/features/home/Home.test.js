import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";

it("renders without crashing", () => {
  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider>
        <Home></Home>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Start arithmetic test")).toBeTruthy();
});

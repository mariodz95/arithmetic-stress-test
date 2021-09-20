import PersonalInformation from "./PersonalInformation";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";

it("renders without crashing", () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider>
        <PersonalInformation></PersonalInformation>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

it("renders without crashing if personalDate is not undefined", () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider>
        <PersonalInformation
          personalData={{ dateOfBirth: "60" }}
        ></PersonalInformation>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

it("renders without crashing if personalDate is not undefined and date of birth is null", () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider>
        <PersonalInformation
          personalData={{ dateOfBirth: null }}
        ></PersonalInformation>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

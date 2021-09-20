import PrivateRoute from "./PrivateRoute";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";

import Home from "../home/Home";

it("should render component if user has been autheticated", () => {
  const currentUser = jest.fn();

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <PrivateRoute component={Home}></PrivateRoute>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

it("should redirect to login if user has not been autheticated", () => {
  const useAuth = jest.fn();
  useAuth.mockReturnValueOnce(null);

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ useAuth }}>
        <PrivateRoute component={Home}></PrivateRoute>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

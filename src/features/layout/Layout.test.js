import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";

it("renders without crashing", () => {
  const currentUser = jest.fn();

  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <Layout></Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

it("handle logout click ", () => {
  const currentUser = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <Layout></Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const logoutButton = getByText("Logout");
  fireEvent.click(logoutButton);
});

it("handle logout click without error", () => {
  const currentUser = jest.fn();
  const logout = jest.fn();

  const { getByText, getAllByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser, logout }}>
        <Layout></Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const logoutButton = getByText("Logout");
  fireEvent.click(logoutButton);
});

it("render null if current user is not logged in", () => {
  const useAuth = jest.fn();
  useAuth.mockReturnValueOnce(null);

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ useAuth }}>
        <Layout></Layout>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(getByText("Login")).toBeTruthy();
  expect(getByText("Sign Up")).toBeTruthy();
});

import Statistic from "./Statistic";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";

it("renders without crashing", () => {
  const data = [
    {
      insertedDate: { seconds: 1619097000, nanoseconds: 0 },
      glucoseType: "Before meal",
      glucoseLevel: 4,
    },
    {
      insertedDate: { seconds: 1619183340, nanoseconds: 0 },
      glucoseLevel: 6,
      glucoseType: "After meal",
    },
    {
      glucoseLevel: 5,
      glucoseType: "Before meal",
      insertedDate: { seconds: 1619183340, nanoseconds: 0 },
    },
  ];
  render(
    <BrowserRouter>
      <AuthContext.Provider>
        <Statistic glucoseResponse={data}></Statistic>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

it("renders without crashing if max after meal is undefined", () => {
  const data = [
    {
      insertedDate: { seconds: 1619097000, nanoseconds: 0 },
      glucoseType: "Before meal",
      glucoseLevel: 4,
    },
    {
      glucoseLevel: 5,
      glucoseType: "Before meal",
      insertedDate: { seconds: 1619183340, nanoseconds: 0 },
    },
  ];
  render(
    <BrowserRouter>
      <AuthContext.Provider>
        <Statistic glucoseResponse={data}></Statistic>
      </AuthContext.Provider>
    </BrowserRouter>
  );
});

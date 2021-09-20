import Result from "./Result";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AuthContext from "../../context/AuthContext";
import { firebaseService } from "./../../services/firebaseService";

it("renders without crashing", async () => {
  jest.spyOn(firebaseService, "getAllTestResults").mockImplementation(() => [
    {
      dateInserted: { seconds: 1625780958, nanoseconds: 690000000 },
      testQuestions: 1,
      testScore: 0,
      userEmail: "mariodz95@gmail.com",
    },
    {
      dateInserted: { seconds: 1624456124, nanoseconds: 690000000 },
      testQuestions: 1,
      userEmail: "mariodz95@gmail.com",
      testScore: 0,
    },
    {
      testQuestions: 1,
      testScore: 0,
      dateInserted: { seconds: 1624449653, nanoseconds: 704000000 },
      userEmail: "mariodz95@gmail.com",
    },
    {
      testQuestions: 1,
      testScore: 0,
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1622307242, nanoseconds: 582000000 },
    },
    {
      testScore: 0,
      testQuestions: 1,
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1622307220, nanoseconds: 345000000 },
    },
    {
      testQuestions: 1,
      testScore: 0,
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1619110120, nanoseconds: 85000000 },
    },
    {
      dateInserted: { seconds: 1619106341, nanoseconds: 223000000 },
      testQuestions: 4,
      userEmail: "mariodz95@gmail.com",
      testScore: 0,
    },
    {
      testQuestions: 62,
      dateInserted: { seconds: 1619097270, nanoseconds: 317000000 },
      testScore: 0,
      userEmail: "mariodz95@gmail.com",
    },
    {
      testQuestions: 3,
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1619096935, nanoseconds: 218000000 },
      testScore: 0,
    },
    {
      testQuestions: 1,
      testScore: 0,
      dateInserted: { seconds: 1619026313, nanoseconds: 225000000 },
      userEmail: "mariodz95@gmail.com",
    },
    {
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1619026128, nanoseconds: 185000000 },
      testScore: 0,
      testQuestions: 1,
    },
    {
      testQuestions: 1,
      testScore: 0,
      dateInserted: { seconds: 1618507245, nanoseconds: 270000000 },
      userEmail: "mariodz95@gmail.com",
    },
    {
      userEmail: "mariodz95@gmail.com",
      testQuestions: 1,
      dateInserted: { seconds: 1617906399, nanoseconds: 701000000 },
      testScore: 0,
    },
    {
      testQuestions: 1,
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1617903394, nanoseconds: 699000000 },
      testScore: 0,
    },
    {
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1617816747, nanoseconds: 786000000 },
      testScore: 0,
      testQuestions: 1,
    },
    {
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1617799891, nanoseconds: 712000000 },
      testQuestions: 7,
      testScore: 0,
    },
    {
      dateInserted: { seconds: 1617797830, nanoseconds: 847000000 },
      testScore: 0,
      testQuestions: 3,
      userEmail: "mariodz95@gmail.com",
    },
    {
      testQuestions: 1,
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1617459820, nanoseconds: 559000000 },
      testScore: 0,
    },
    {
      testQuestions: 1,
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1617458623, nanoseconds: 853000000 },
      testScore: 0,
    },
    {
      testQuestions: 1,
      dateInserted: { seconds: 1617457137, nanoseconds: 689000000 },
      userEmail: "mariodz95@gmail.com",
      testScore: 0,
    },
    {
      testScore: 0,
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1617457059, nanoseconds: 347000000 },
      testQuestions: 1,
    },
    {
      testQuestions: 1,
      userEmail: "mariodz95@gmail.com",
      testScore: 0,
      dateInserted: { seconds: 1617456445, nanoseconds: 690000000 },
    },
    {
      dateInserted: { seconds: 1617456177, nanoseconds: 736000000 },
      userEmail: "mariodz95@gmail.com",
      testQuestions: 1,
      testScore: 0,
    },
    {
      userEmail: "mariodz95@gmail.com",
      dateInserted: { seconds: 1617367458, nanoseconds: 593000000 },
      testQuestions: 3,
      testScore: 0,
    },
    {
      testScore: 0,
      dateInserted: { seconds: 1617367336, nanoseconds: 211000000 },
      userEmail: "mariodz95@gmail.com",
      testQuestions: 3,
    },
    {
      dateInserted: { seconds: 1617348266, nanoseconds: 842000000 },
      testQuestions: 3,
      testScore: 0,
      userEmail: "mariodz95@gmail.com",
    },
    {
      testScore: 0,
      userEmail: "mariodz95@gmail.com",
      testQuestions: 7,
      dateInserted: { seconds: 1617348055, nanoseconds: 752000000 },
    },
  ]);

  const currentUser = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ currentUser }}>
        <Result></Result>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  const insertGlucoseBtn = getByText("Insert glucose");
  fireEvent.click(insertGlucoseBtn);

  const closeButton = getByText("×");
  fireEvent.click(closeButton);
});

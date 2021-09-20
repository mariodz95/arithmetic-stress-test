import { db } from "./../firebase/firebase";
import firebase from "firebase/app";

export const firebaseService = {
  getStressTestData,
  getGlucoseData,
  saveStressTestResult,
  insertTestDataGlucose,
  getAllTestResults,
  getPersonalData,
  updatePersonalData,
  insertGlucoseData,
  insertSmartDeviceData,
  getSmartDeviceData,
};

async function getStressTestData(userId, date) {
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  var stressTestData = [];
  var result = await db
    .collection("testData")
    .doc(userId)
    .collection("information")
    .where("insertedDate", ">", firstDay)
    .where("insertedDate", "<", lastDay)
    .orderBy("insertedDate", "asc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        stressTestData.push(doc.data());
      });
      return stressTestData;
    });
  return result;
}

async function getGlucoseData(userId, date) {
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  var glucoseData = [];
  var result = await db
    .collection("glucoseLevels")
    .doc(userId)
    .collection("levels")
    .where("insertedDate", ">", firstDay)
    .where("insertedDate", "<", lastDay)
    .orderBy("insertedDate", "asc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        glucoseData.push(doc.data());
      });
      return glucoseData;
    });
  return result;
}

async function saveStressTestResult(stressTestResult) {
  db.collection("stressTestResults").add({
    dateInserted: stressTestResult.date,
    testQuestions: stressTestResult.testQuestions,
    testScore: stressTestResult.score,
    durationTime: stressTestResult.durationTime,
    userEmail: stressTestResult.userEmail,
  });
}

async function insertTestDataGlucose(userId, beforeTestData, afterTestData) {
  await db
    .collection("testData")
    .doc(userId)
    .collection("information")
    .add({
      userId: userId,
      glucoseLevelBeforeTest:
        beforeTestData === null ? null : beforeTestData.glucoseLevel,
      heartRateBeforeTest:
        beforeTestData === null ? null : beforeTestData.heartRate,
      stressLevelBeforeTest:
        beforeTestData === null ? null : beforeTestData.stressLevel,
      insertedDate: firebase.firestore.Timestamp.fromDate(new Date()),
      glucoseLevelAfterTest:
        afterTestData === null ? null : afterTestData.glucoseLevel,
      heartRateAfterTest:
        afterTestData === null ? null : afterTestData.heartRate,
      stressLevelAfterTest:
        afterTestData === null ? null : afterTestData.stressLevel,
    })
    .then(() => {
      localStorage.removeItem("testData");
    });
}

async function getAllTestResults() {
  var testData = [];
  var result = await db
    .collection("stressTestResults")
    .orderBy("dateInserted", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        testData.push(doc.data());
      });
      return testData;
    });
  return result;
}

async function getPersonalData(userId) {
  var result = await db
    .collection("personalInformation")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
    });

  return result;
}

async function updatePersonalData(userId, userData) {
  db.collection("personalInformation").doc(userId).set({
    name: userData.name,
    lastName: userData.lastName,
    typeOfDiabetes: userData.typeOfDiabetes,
    weight: userData.weight,
    dateOfBirth: userData.dateOfBirth,
  });
}

async function insertGlucoseData(userId, glucoseLevel) {
  db.collection("glucoseLevels")
    .doc(userId)
    .collection("levels")
    .add({
      glucoseLevel: Number(glucoseLevel.glucoseLevel),
      glucoseType: glucoseLevel.glucoseType,
      insertedDate: glucoseLevel.insertedDate,
    });
}

async function insertSmartDeviceData(userId, smartDevice) {
  db.collection("smartDevice")
    .doc(userId)
    .collection("data")
    .add({
      heartRate: Number(smartDevice.heartRate),
      distance: Number(smartDevice.distance),
      steps: Number(smartDevice.steps),
      calories: Number(smartDevice.calories),
      durationTimeMinutes: Number(smartDevice.durationTimeMinutes),
      dateTime: smartDevice.dateTime,
    });
}

async function getSmartDeviceData(userId, date) {
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  var smartDeviceData = [];
  var result = await db
    .collection("smartDevice")
    .doc(userId)
    .collection("data")
    .where("dateTime", ">", firstDay)
    .where("dateTime", "<", lastDay)
    .orderBy("dateTime", "asc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        smartDeviceData.push(doc.data());
      });
      return smartDeviceData;
    });
  return result;
}

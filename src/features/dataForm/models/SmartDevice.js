export class SmartDevice {
  constructor(
    calories,
    distance,
    durationTimeMinutes,
    heartRate,
    steps,
    dateTime
  ) {
    this.calories = calories;
    this.distance = distance;
    this.durationTimeMinutes = durationTimeMinutes;
    this.heartRate = heartRate;
    this.steps = steps;
    this.dateTime = dateTime;
  }
}

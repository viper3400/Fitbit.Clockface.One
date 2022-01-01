export class Statistics {
  constructor(steps, calories, elevationGain, activeZoneMinutes, heartRate) {
    this.steps = steps;
    this.calories = calories;
    this.elevationGain = elevationGain;
    this.activeZoneMinutes = activeZoneMinutes;
    this.heartRate = heartRate;
  }
  
  getSteps() {
    return this.steps;
  }
  
  getCalories() {
    return this.calories;
  }
  
  getElevationGain() {
    return this.elevationGain;
  }
  
  getActiveZoneMinutes() {
    return this.activeZoneMinutes;
  }
  
  getHeartRate() {
    return this.heartRate;
  }
}
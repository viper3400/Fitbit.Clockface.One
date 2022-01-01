export class Statistics {
  constructor(steps, calories, elevationGain, activeZoneMinutes) {
    this.steps = steps;
    this.calories = calories;
    this.elevationGain = elevationGain;
    this.activeZoneMinutes = activeZoneMinutes;
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
}
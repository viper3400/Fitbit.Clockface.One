import { me as appbit } from "appbit";
import { goals } from "user-activity";

export function getGoalStatistics() {
  let steps = getStepGoal();
  let calories = getCaloriesGoal();
  let elevationGain = getElevationGoal();
  let activeZoneMinutes = getActiveZoneMinutesGoal();
  let heartRate = 0;
}
export function getStepGoal() {
  if (checkPermission() && goals.steps !== undefined) {
   return goals.steps;
  }
  else return 0;
}

export function getCaloriesGoal() {
    if (checkPermission() && goals.calories  !== undefined) {
   return goals.calories;
  }
  else return 0;
}

export function getElevationGoal() {
    if (checkPermission() && goals.elevationGain  !== undefined) {
   return goals.elevationGain;
  }
  else return 0;
}

export function getActiveZoneMinutesGoal() {
    if (checkPermission() && goals.activeZoneMinutes  !== undefined) {
   return goals.activeZoneMinutes;
  }
  else return 0;
}

function checkPermission() {
  return appbit.permissions.granted("access_activity");
}

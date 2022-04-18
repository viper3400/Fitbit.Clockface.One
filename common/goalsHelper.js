import { me as appbit } from "appbit";
import { goals, dayHistory } from "user-activity";
import { Statistics } from "./Statistics";

export function getGoalStatistics() {
  let steps = getStepGoal();
  let calories = getCaloriesGoal();
  let elevationGain = getElevationGoal();
  let activeZoneMinutes = getActiveZoneMinutesGoal();
  
  const stats = new Statistics(steps, calories, elevationGain, activeZoneMinutes);
  return stats;
}
function getStepGoal() {
  if (checkPermission() && goals.steps !== undefined) {
   return goals.steps;
  }
  else return 0;
}

function getCaloriesGoal() {
    if (checkPermission() && goals.calories  !== undefined) {
   return goals.calories;
  }
  else return 0;
}

function getElevationGoal() {
    if (checkPermission() && goals.elevationGain  !== undefined) {
   return goals.elevationGain;
  }
  else return 0;
}

function getActiveZoneMinutesGoal() {
    if (checkPermission() && goals.activeZoneMinutes  !== undefined) {
   return goals.activeZoneMinutes.total;
  }
  else return 0;
}

export function getRestingHeartRate() {
  if (checkPermission()) {
    if (dayHistory.maxRecordCount > 0) {
      return dayHistory.query()[0].restingHeartRate ? dayHistory.query()[0].restingHeartRate : "--" ;  
    } else return "--"
    
  } else return "--";
}

function checkPermission() {
  return appbit.permissions.granted("access_activity");
}

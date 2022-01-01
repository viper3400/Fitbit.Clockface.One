import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as helper from "../common/dateTimeHelper";
import * as goals from "../common/goalsHelper";
import { me as appbit } from "appbit";
import { today, ActiveZoneMinutes} from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { Statistics } from "../common/Statistics";

let showGoals = false;

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const hoursLabel = document.getElementById("hours");
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const dayOfWeekLabel = document.getElementById("dayOfWeek");
const dateLabel = document.getElementById("date");

const background = document.getElementById("toggleArea");
background.addEventListener("click", () => {
  showGoals = !showGoals;
});


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let currentDate = evt.date;
  let hours = currentDate.getHours();  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(currentDate.getMinutes());
  let secs = util.zeroPad(currentDate.getSeconds());
  let dayOfWeek = helper.getDayofWeek(currentDate);
  let monthName = helper.getMonth(currentDate);
  let day = util.zeroPad(currentDate.getDate());

  hoursLabel.text = `${hours}`;
  minutesLabel.text = `${mins}`;
  secondsLabel.text = `${secs}`;
  dayOfWeekLabel.text = `${dayOfWeek}`;
  dateLabel.text = `${day}.${monthName}`;
  
  let stats;
  if (showGoals) {
    stats = goals.getGoalStatistics();
  }
  else {
     stats = getCurrentStatistics();
  }
  
  setSteps(stats);
  setCalories(stats);
  setFloors(stats);
  setMinutes(stats);  
  getHeartRate();
  
  setDescriptorLabels();
    
}

function getCurrentStatistics() {
  let steps = 0;
  let calories = 0;
  let elevationGain = 0;
  let activeZoneMinutes = 0;
  if (appbit.permissions.granted("access_activity")) {
    steps = today.adjusted.steps;
    calories = today.adjusted.calories;
    elevationGain = today.adjusted.elevationGain;
    activeZoneMinutes = today.adjusted.activeZoneMinutes.total;   
  }
  
  const stats = new Statistics(steps, calories, elevationGain, activeZoneMinutes);
  return stats;
}

function setSteps(stats) {
  const stepsLabel = document.getElementById("steps");
  stepsLabel.text = `${stats.getSteps()}`;
}

function setCalories(stats) {
  const calsLabel = document.getElementById("cals");
  calsLabel.text = `${stats.getCalories()}`;
}

function setFloors(stats) {
  const floorsLabel = document.getElementById("floors");
  floorsLabel.text = `${stats.getElevationGain()}`;
}

function setMinutes(stats) {
  const minutesLabel = document.getElementById("actmins");
  minutesLabel.text = `${stats.getActiveZoneMinutes()}`;
}

function setHeartRate(hr) {
  const heartRateLabel = document.getElementById("heartrate");
  heartRateLabel.text = `${hr}`;  
}

function getHeartRate() {
  let hr = 0;
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate") && !showGoals) {
    const hrm = new HeartRateSensor();
    hrm.start();
    hrm.addEventListener("reading", () => {
      hr = hrm.heartRate;
      setHeartRate(hr);
      hrm.stop();
    });
  } else if (showGoals) {
    setHeartRate(goals.getRestingHeartRate());
  }
}

function setDescriptorLabels() {
  const stepsDescriptorLabel = document.getElementById("steps-descriptor");
  const calsDescriptorLabel = document.getElementById("cals-descriptor");
  const floorsDescriptorLabel = document.getElementById("floors-descriptor");
  const azmDescriptorLabel = document.getElementById("actmins-descriptor");
  const heartRateDescriptorLabel = document.getElementById("heartrate-descriptor");
  if (!showGoals) {
    heartRateDescriptorLabel.text = "hr";
    stepsDescriptorLabel.text = "steps";
    calsDescriptorLabel.text = "calories";
    floorsDescriptorLabel.text = "floors";
    azmDescriptorLabel.text = "minutes"
  } else {
    heartRateDescriptorLabel.text = "rest hr";
    stepsDescriptorLabel.text = "steps goal";
    calsDescriptorLabel.text = "cals goal";
    floorsDescriptorLabel.text = "floors goal";
    azmDescriptorLabel.text = "mins goal"
  }
}








import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as helper from "../common/dateTimeHelper";
import { me as appbit } from "appbit";
import { today, ActiveZoneMinutes} from "user-activity";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const hoursLabel = document.getElementById("hours");
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const dayOfWeekLabel = document.getElementById("dayOfWeek");
const dateLabel = document.getElementById("date");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  console.log('tick');
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
  
  setSteps(today);
  setCalories(today);
  setFloors(today);
  setMinutes(today);
  setHeartrate();
}


function setSteps(today) {
  const stepsLabel = document.getElementById("steps");
  let steps = 0;
  if (appbit.permissions.granted("access_activity")) {
     steps = today.adjusted.steps;
  }
  stepsLabel.text = `${steps}`;
}

function setCalories(today) {
  const calsLabel = document.getElementById("cals");
  let cals = 0;
  if (appbit.permissions.granted("access_activity")) {
      cals = today.adjusted.calories;
    }
  calsLabel.text = `${cals}`;
}

function setFloors(today) {
  const floorsLabel = document.getElementById("floors");
  let floors = 0;
  if (appbit.permissions.granted("access_activity")) {
      floors = today.adjusted.elevationGain;
    }
  floorsLabel.text = `${floors}`;
}

function setMinutes(today) {
  const minutesLabel = document.getElementById("actmins");
  let mins = 0;
  if (appbit.permissions.granted("access_activity")) {
      mins = today.adjusted.activeZoneMinutes.total;
    }
  minutesLabel.text = `${mins}`;
}

function setHeartrate() {
  const heartRateLabel = document.getElementById("heartrate");
  let hr = 0;
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
    const hrm = new HeartRateSensor();
    hrm.start();
    hrm.addEventListener("reading", () => {
      hr =hrm.heartRate;
      heartRateLabel.text = `${hr}`;
      hrm.stop();
    });
  }
}








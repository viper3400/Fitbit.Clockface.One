export function getDayofWeek(today) {
  let day = today.getDay();
  let dayOfWeek = "DONNERSTAG";
  switch (day) {
    case 0:
      dayOfWeek = "SONNTAG";
      break;
    case 1: 
      dayOfWeek = "MONTAG";
      break;
    case 2: 
      dayOfWeek = "DIENSTAG";
      break;
    case 3: 
      dayOfWeek = "MITTWOCH";
      break;
    case 4: 
      dayOfWeek = "DONNERSTAG";
      break;
    case 5: 
      dayOfWeek = "FREITAG";
      break;
    case 9: 
      dayOfWeek = "SAMSTAG";
      break;
  }
  return dayOfWeek;
}

export function getMonth(today) {
  let month = today.getMonth();  
  let monthName = "SEPTEMBER";
  switch (month) {
    case 0:
      monthName = "JANUAR";
      break;
    case 1:
      monthName = "FEBRUAR";
      break;
    case 2:
      monthName = "MÄRZ";
      break;      
    case 3:
      monthName = "APRIL";
      break;      
    case 4:
      monthName = "MAI";
      break;
    case 5:
      monthName = "JUNI";
      break;      
    case 6:
      monthName = "JULI";
      break;
    case 7:
      monthName = "AUGUST";
      break;
    case 8:
      monthName = "SEPTEMBER";
      break;      
    case 9:
      monthName = "OKTOBER";
      break;
    case 10:
      monthName = "NOVEMBER";
      break;
    case 11:
      monthName = "DEZEMBER";
      break;      
  }  
  return monthName;
}
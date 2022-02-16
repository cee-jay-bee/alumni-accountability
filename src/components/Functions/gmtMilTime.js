const gmtMilTime = (time) => { // your input

    time = time.split(':'); // convert to array

    // fetch
    let hours = Number(time[0]) - 6;
    let minutes = Number(time[1]);

    // calculate
    let timeValue;
    if (hours < 0) {
      hours += 24;
    }

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    } 

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

    // show
    return timeValue;
  }

export default gmtMilTime;
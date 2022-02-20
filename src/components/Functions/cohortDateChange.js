const cohortDateChange = (date) => {
    let eventCompareDate = date.split('-');
    console.log(eventCompareDate);
    let twoDigitMonth = eventCompareDate[1];
    let twoDigitDate = eventCompareDate[2];
    
    if (twoDigitDate.length == 1){
        twoDigitDate = "0" + twoDigitDate;
    }
    let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate[0];

    return eventDate;
}


export default cohortDateChange;
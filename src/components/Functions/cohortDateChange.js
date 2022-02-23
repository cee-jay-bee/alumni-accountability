const cohortDateChange = (date) => {
    if (date) {
        let eventCompareDate = date.split('-');
        
        let twoDigitMonth = eventCompareDate[1];
        let twoDigitDate = eventCompareDate[2];
        
        if (twoDigitDate.length == 1){
            twoDigitDate = "0" + twoDigitDate;
        }
        let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate[0];

        return eventDate;
    } else {
        return null;
    }
}


export default cohortDateChange;
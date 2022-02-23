const editDateChange = (date) => {

    let eventCompareDate = new Date(date);
    let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
    let twoDigitDate = eventCompareDate.getDate() + "";
    
    if (twoDigitMonth.length === 1){
        twoDigitMonth = "0" + twoDigitMonth;
    }
    if (twoDigitDate.length === 1){
        twoDigitDate = "0" + twoDigitDate;
    }
    let eventDate = eventCompareDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate

    return eventDate;
}


export default editDateChange;
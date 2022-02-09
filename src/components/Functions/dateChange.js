const dateChange = (date) => {
    let eventCompareDate = new Date(date);
    let twoDigitMonth = eventCompareDate.getMonth() + 1 + "";
    let twoDigitDate = eventCompareDate.getDate() + "";
    if (twoDigitDate.length == 1){
        twoDigitDate = "0" + twoDigitDate;
    }
    let eventDate = twoDigitMonth + "/" + twoDigitDate + "/" + eventCompareDate.getFullYear();
    return eventDate;
}

export default dateChange;
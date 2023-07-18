export function localDateStringToDDMMYYYY(localDateString) {
    // Convert the local date string to a Date object.
    const localDate = new Date(localDateString)

    // Get the day, month, and year from the Date object.
    let day = localDate.getDate();
    let month = localDate.getMonth() + 1;
    let year = localDate.getFullYear();

    // Add leading zeros to the day and month digits if they are less than 10.
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    // Return the date in DD/MM/YYYY format.
    return day + "/" + month + "/" + year;
}
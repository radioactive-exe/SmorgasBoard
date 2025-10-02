/**
 * @file
 * A file containing useful constants and literals to be used throughout the frontend of SmorgasBoard.
 * @author Radioactive.exe
 * {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

const WEEKDAYS: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const MONTHS: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const VALID_FILE_TYPES: string[] = ["jpg", "jpeg", "bmp", "png", "gif", "webp"];
const MAX_FILE_SIZE = 10_485_760;

export { MAX_FILE_SIZE, MONTHS, VALID_FILE_TYPES, WEEKDAYS };

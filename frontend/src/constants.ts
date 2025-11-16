/**
 * A file containing useful constants and literals to be used throughout the
 * frontend of SmorgasBoard.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

/**
 * Days of the week in an array that indexes them by JS/TS Date integers for
 * days .
 */
const WEEKDAYS: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

/**
 * Months of the year in an array that indexes them by JS/TS Date integers for
 * months.
 */
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

/** Valid file types to be used in the Image uploading input for validation. */
const VALID_FILE_TYPES: string[] = ["jpg", "jpeg", "bmp", "png", "gif", "webp"];

/** The Maximum accepted size when uploading a file in the Image upload input. */
const MAX_FILE_SIZE = 10_485_760;

export { MAX_FILE_SIZE, MONTHS, VALID_FILE_TYPES, WEEKDAYS };

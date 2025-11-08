/**
 * This file contains all the uncategorised types used for panel data, app
 * functionality, and other things.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

/** The shape of a stored pair of coordinates when dealing with Weather panels. */
interface EarthCoordinates {
    lat: number;
    lon: number;
}

/**
 * The shape of a stored task when dealing with Todo panels.
 *
 * @remarks
 * The task content is stored, as well as whether or not it was
 * checked/completed. This is used in instances like loading the panels on
 * sign-in.
 */
interface TodoTask {
    task: string;
    checked: boolean;
}

export { EarthCoordinates, TodoTask };

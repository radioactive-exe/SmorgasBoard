/**
 * This file contains the numerical IDs for the different PanelTypes in
 * Smorgasboard.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

/**
 * The IDs of different PanelTypes, the keys of the entries being the type of
 * panel, and the values being their respective ID.
 */
enum PanelTypeId {
    PREVIEW = -1,
    DEFAULT = 0,
    NOTEPAD = 1,
    PHOTO = 2,
    CLOCK = 3,
    TODO = 4,
    WEATHER = 5,
}

export { PanelTypeId };

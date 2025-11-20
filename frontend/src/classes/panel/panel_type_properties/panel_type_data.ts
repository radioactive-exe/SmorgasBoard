/**
 * This file contains the definitions for the panel data types.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

/**
 * Different Panel Data Types, the keys of the entries being the type of data
 * content, and the values being their respective ID.
 */
enum PanelTypeData {
    /**
     * The Panel stores no data beyond its behaviour and Config.
     *
     * @example
     *
     * A Clock panel.
     */
    NONE = -1,
    /**
     * The Panel stores and saves data local to the user.
     *
     * @example
     *
     * A Photo panel, or a Notepad panel.
     */
    LOCAL = 0,
    /**
     * The Panel stores and utilises data shared by all users on Smorgasboard.
     *
     * @example
     *
     * (To be implemented) Quote of the day panel, Recommendation panel.
     */
    GLOBAL = 1,
    /**
     * The Panel stores and utilises data from an external source, such as an
     * external third-party API.
     *
     * @example
     *
     * A Weather panel.
     */
    EXTERNAL = 2,
}

export { PanelTypeData };

/**
 * @description Different Panel Data Types, the keys of the entries being the type of data content, and the values being their respective ID.
 * @enum {number}
 */
enum PanelTypeData {
    /**
     * @description The Panel stores no data beyond its behaviour and Config.
     * @example A Clock Panel.
     */
    NONE = -1,
    /**
     *
     */
    LOCAL = 0,
    GLOBAL = 1,
    EXTERNAL = 2,
}

export { PanelTypeData };

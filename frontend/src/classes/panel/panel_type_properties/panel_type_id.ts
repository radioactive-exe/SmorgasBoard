/**
 * @description Different Panel Types/Kinds (Notepad, Default (empty), Preview, etc.), the keys of the entries being the type of panel, and the values being their respective ID.
 * @enum {number}
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

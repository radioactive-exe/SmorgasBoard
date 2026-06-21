/**
 * The file containing the {@link Theme} class.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

/**
 * A class defining Themes to be used in SmorgasBoard.
 *
 * @remarks
 * This class contains useful methods and fields for defining, storing, and
 * setting different themes.
 */
class Theme {
    /*
     * These are all the Defined Themes in the project/application. They can be
     * accessed during runtime to switch themes and have any necessary info.
     */

    static readonly DEFAULT = new Theme(0, "Default Theme", "");
    static readonly CONSOLE = new Theme(1, "Hacker-man Theme", "console");
    static readonly PALENIGHT = new Theme(2, "Palenight Theme", "palenight");

    // TODO Implement Mode preference themes like Light and Dark Mode

    /**
     * Creates an instance of a Theme.
     *
     * @remarks
     * This constructor is private so we cannot create any other themes during
     * runtime.
     *
     * @param id        - The internal ID number for the Theme.
     * @param name      - The user-friendly client-facing name to be used for
     *   the Theme in menus, UI, etc.
     * @param dataTheme - The dataset attribute value of the Theme.
     *
     * @example
     *
     * ```ts
     * static readonly MIDNIGHT = new Theme(
     *   5,
     *   "Midnight Calm",
     *   "themes/midnight.css",
     * );
     * ```
     *
     * Here, a new Theme is defined for the application, with an ID of `5`, a
     * UI-friendly name "Midnight Calm", and an example relative URL for the CSS
     * file of `./themes/midnight.css`.
     */
    private constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly dataTheme: string, // private readonly mode:
    ) {}

    /**
     * Returns the Theme ID.
     *
     * @remarks
     * The ID is used when storing the current Theme, as well as setting the
     * Theme from a stored ID
     *
     * @returns The Theme's internal ID.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Returns the name of the Theme.
     *
     * @remarks
     * The name returned is the user-friendly UI-facing name.
     *
     * @returns The name.
     */
    public toString(): string {
        return this.name;
    }

    /**
     * Returns ths dataset value of the Theme.
     *
     * @remarks
     * This method is called when setting themes, in order to change the theme
     * document's theme.
     *
     * @returns The dataset value of the Theme.
     */
    public getDatasetValue(): string {
        return this.dataTheme;
    }
}

export { Theme };

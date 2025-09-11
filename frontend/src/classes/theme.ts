/**
 * @file
 * The file containing the {@link Theme} class.
 * @author Radioactive.exe
 * {@link https://github.com/radioactive-exe | GitHub Profile}
 * {@link https://github.com/radioactive-exe/SmorgasBoard | The GitHub Repository}
 */


/** File Header Delimiter. */

/**
 * A class defining Themes to be used in SmorgasBoard.
 * @remarks
 * This class contains useful methods and fields for defining, storing, and setting different themes.
 */
class Theme {
    /**
     * These are all the Defined Themes in the project/application. They can be accessed during runtime to switch themes and have any necessary info.
     */

    static readonly DEFAULT = new Theme(
        0,
        "Default Theme",
        "themes/default.css",
    );
    static readonly CONSOLE = new Theme(
        1,
        "Hacker-man Theme",
        "themes/console.css",
    );

    // TODO Implement Mode preference themes like Light and Dark Mode

    /**
     * Creates an instance of a Theme.
     * @remarks
     * This constructor is private so we cannot create any other themes during runtime.
     * @param id - The internal ID number for the Theme.
     * @param name - The user-friendly client-facing name to be used for the Theme in menus, UI, etc.
     * @param url - The relative URL of the Theme's CSS File.
     * @example
     * ```ts
     * static readonly MIDNIGHT = new Theme(
     *   5,
     *   "Midnight Calm",
     *   "themes/midnight.css",
     * );
     * ```
     * Here, a new Theme is defined for the application, with an ID of `5`, a UI-friendly name "Midnight Calm", and an example relative URL for the CSS file of `./themes/midnight.css`.
     */
    private constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly url: string, // private readonly mode:
    ) {}

    /**
     * Returns the Theme ID.
     * @remarks
     * The ID will be used to later set the Theme from a stored ID
     * @returns The Theme's ID.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Returns the name of the Theme.
     * @remarks
     * The name returned is the user-friendly UI-facing name.
     * @returns The name.
     */
    public toString(): string {
        return this.name;
    }

    /**
     * Returns ths URL of the Theme.
     * @remarks
     * This method is called when setting themes, in order to change the theme link's `src` attribute.
     * @returns The URL relative to the main `index.html` running the application.
     */
    public getUrl(): string {
        return this.url;
    }
}

export { Theme };

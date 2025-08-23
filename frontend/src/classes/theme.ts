/**
 * @description: A class to facilitate the storage and usage of Themes in the application, with useful fields and methods
 *
 * @class Theme
 */
class Theme {
    /**
     * @description: These are all the Defined Themes in the project/application. They can be accessed during runtime to switch themes and have any necessary info.
     *
     * @static
     * @memberof Theme
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
     * @description: Creates an instance of a Theme.
     *
     * NOTE: Constructor is private so we cannot create any other themes during runtime.
     *
     * @constructor
     * @param {number} id
     * @param {string} name
     * @param {string} url
     * @memberof Theme
     */
    private constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly url: string, // private readonly mode:
    ) {}

    /**
     * @description: Returns the name of the theme if it is in a @type {string} context
     *
     * @return {string}
     * @memberof Theme
     */
    public toString(): string {
        return this.name;
    }

    /**
     * @description: Returns ths URL/Location of the theme, used when setting themes.
     *
     * @return {string}
     * @memberof Theme
     */
    public getUrl(): string {
        return this.url;
    }
}

export { Theme };

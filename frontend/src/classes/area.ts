/**
 * This file contains the {@link Area} class. Different interfaces, including
 * {@link Coordinates} and {@link Size}, that are utilised in the Area class are
 * also defined here.
 *
 * @module
 *
 * @author Radioactive.exe
 *   {@link https://github.com/radioactive-exe | GitHub Profile}
 */

/** File Header Delimiter. */

import { Dashboard } from "./dashboard.js";

/**
 * A Coordinate object.
 *
 * @remarks
 * This object stores the X (horizontal) and Y (vertical) positions of the item
 * they belong to.
 *
 * @see {@link Size}
 */
interface Coordinates {
    x: number;
    y: number;
    /**
     * Whether these Coordinates are in absolute units (literal pixels) or
     * fractional units (i.e. "cells" in the dashboard grid system).
     *
     * @remarks
     * Whether or not these Coordinates are in absolute units (literal pixels)
     * or fractional units (i.e. Coordinates on the dashboard grid system). This
     * member is passed when we are passing Coordinates in functions and
     * constructors. Having this optional member allows us to be able to
     * instantiate and pass Areas and Coordinates in both fractional and
     * absolute units without having to (a) do a lot of calculations in the
     * caller, or (b) take in an extra parameter in the functions.
     */
    isAbsolute?: boolean;
}

/**
 * A Size object.
 *
 * @remarks
 * This stores the width and height (horizontal and vertical dimensions) of the
 * item they belong to.
 *
 * @see {@link Coordinates}
 */
interface Size {
    width: number;
    height: number;
    /**
     * Whether this Size is in absolute units (literal pixels) or fractional
     * units (i.e. "cells" in the dashboard grid system).
     *
     * @remarks
     * A value of true means that it is in absolute units, while a value of
     * false (or simply not passing this optional member) implies that the size
     * is fractional. This member is passed when we are passing a Size to
     * functions and constructors, giving us the ability to instantiate and pass
     * Sizes in both fractional and absolute units without having to (a) do a
     * lot of calculations in the function call scope, or (b) take in an extra
     * parameter in the functions.
     */
    isAbsolute?: boolean;
}

/**
 * A Rotation Offset object.
 *
 * @remarks
 * It stores two main things. Firstly, the actual rotation in degrees, and
 * secondly, the offset to any shadow if needed. This is declared to make
 * functions and eliminating code repetition easier.
 */
interface Offset {
    /**
     * The rotation in degrees of the object.
     *
     * @remarks
     * This stores the rotation along 2 axes, the X-axis and the Y-axis.
     */
    rotation: {
        x: number;
        y: number;
    };
    /**
     * The shadow offset.
     *
     * @remarks
     * This is only needed when there is any 3-dimensional preservation to the
     * rotation, and either the children of the item or the item itself cast a
     * shadow.
     */
    shadow: {
        x: number;
        y: number;
    };
}

/**
 * The simple object format of an {@link Area}.
 *
 * @remarks
 * This is used when we are instantiating an {@link Area} from an Object, or when
 * we need an Object-format version of an Area to `JSON.stringify()` for
 * storage, either locally or in the database. This instance, similar to the
 * Area's parsed coordinates and sizes, uses fractional units.
 */
interface AreaInstance {
    pos: Coordinates;
    size: Size;
}

// TODO: Fix Panel Link

/**
 * This is the Area class.
 *
 * @remarks
 * This class holds all information for the Area (position and size) of a Panel
 * or other object, with relevant and helpful methods and members. It includes
 * setters and getters, as well as parsing for both absolute and fractional
 * units used for Sizes and Coordinates. This class is used when checking for
 * collision, snapping Panels, and holistically keeping the dashboard
 * organised.
 *
 * @see {@link Size}
 * @see {@link Coordinates}
 * @see {@link AreaInstance}
 */
class Area {
    /**
     * A bare-bones default Area.
     *
     * @remarks
     * This is a static member used when a Panel needs to be initialised from
     * scratch and either (a) does not have a set Area or (b) has one that will
     * be changed right after.
     */
    static readonly INIT: Area = new Area(
        { x: 0, y: 0 },
        { width: 1, height: 1 },
    );

    /** Position component of the Area. */
    private pos: Coordinates;
    /** Size component of the Area. */
    private size: Size;

    /**
     * Creates an instance of an Area.
     *
     * @remarks
     * The constructor creates an Area from a pair of Coordinates and an
     * optional Size input. If no size is passed, default size of `{1, 1}` is
     * used instead.
     *
     * @param coords - The input coordinates (absolute or fractional) to
     *   instantiate the Area with. These are passed to and dealt with inside
     *   {@link setPosition | setCoordinates()} .
     * @param size   - The input size (absolute or fractional) to instantiate
     *   the Area with. These are passed to and dealt with inside
     *   {@link setSize | setSize()} .
     *
     * @example
     *
     * ```ts
     * const a = new Area({x: 0, y: 0});
     * ```
     *
     * Instantiates a new Area positioned at the origin (top left of the
     * dashboard/container) and with a default size of `{width: 1, height: 1}`.
     */
    public constructor(
        coords: Coordinates,
        size: Size = { width: 1, height: 1 },
    ) {
        this.setPosition(coords);
        this.setSize(size);
    }

    /**
     * Returns the X (horizontal) coordinate of the Area.
     *
     * @returns The X coordinate.
     *
     * @see {@link getCoordinates | getCoordinates()}
     * @see {@link getAbsoluteX | getAbsoluteX()}
     * @see {@link pos}
     */
    public getX(): number {
        return this.pos.x;
    }

    /**
     * Returns the X (horizontal) coordinate of the Area in pixels.
     *
     * @returns The X coordinate in pixels.
     *
     * @see {@link getCoordinates | getCoordinates()}
     * @see {@link getX | getX()}
     * @see {@link pos}
     */
    public getAbsoluteX(): number {
        return this.pos.x * Dashboard.getFractionalWidth();
    }

    /**
     * Returns the Y (Vertical) coordinate of the Area.
     *
     * @returns The Y coordinate.
     *
     * @see {@link getCoordinates}
     * @see {@link getAbsoluteY | getAbsoluteY()}
     * @see {@link pos}
     */
    public getY(): number {
        return this.pos.y;
    }

    /**
     * Returns the Y (Vertical) coordinate of the Area in pixels.
     *
     * @returns The Y coordinate in pixels.
     *
     * @see {@link getCoordinates}
     * @see {@link getY | getY()}
     * @see {@link pos}
     */
    public getAbsoluteY(): number {
        return this.pos.y * Dashboard.getFractionalHeight();
    }

    /**
     * Returns the position/coordinates of this Area.
     *
     * @remarks
     * The position is returned as as an object of type {@link Coordinates},
     * expressed in fractional units ({@link pos}).
     *
     * @returns - The Coordinates (relative/fractional) of the Area.
     */
    public getCoordinates(): Coordinates {
        return this.pos;
    }

    /**
     * Sets the Area's position from an input.
     *
     * @remarks
     * This setter deals with both absolute and fractional sizes. If an absolute
     * set of coordinates is passed, it is converted to fractional units to be
     * stored as such. As such, the {@link pos} member will always store the
     * coordinates in units.
     *
     * @param coords - The input coordinates to set the Area's position to.
     *
     * @example
     *
     * ```ts
     * areaOne.setCoordinates({x: 200, y: 250, isAbsolute: true});
     * ```
     *
     * Sets `areaOne`'s coordinates with literal pixel values 200 and 250. In
     * other words, `areaOne` will be positioned 200 pixels horizontally and 250
     * pixels vertically inside the dashboard/container, and will thus be
     * snapped/rounded to the nearest row and column in the dashboard.
     *
     * @see {@link setSize | setSize()}
     * @see {@link Coordinates#isAbsolute}
     */
    public setPosition(coords: Coordinates): void {
        if (coords.isAbsolute) {
            // ? Rounds the width and height to the nearest dashboard fractional unit if they are absolute
            this.pos = {
                x: Math.round(coords.x / Dashboard.getFractionalWidth()),
                y: Math.round(coords.y / Dashboard.getFractionalHeight()),
            };
        } else {
            this.pos = coords;
        }
    }

    /**
     * Gets the fractional width of the Area.
     *
     * @returns The fractional Width of the Area.
     *
     * @see {@link size}
     * @see {@link getSize | getSize()}
     * @see {@link getAbsoluteWidth | getAbsoluteWidth()}
     * @see {@link getHeight | getHeight()}
     */
    public getWidth(): number {
        return this.size.width;
    }

    /**
     * Gets the absolute width of the Area in pixels.
     *
     * @returns The absolute Width (in pixels) of the Area.
     *
     * @see {@link size}
     * @see {@link getSize | getSize()}
     * @see {@link getWidth | getWidth()}
     * @see {@link getAbsoluteHeight | getAbsoluteHeight()}
     */
    public getAbsoluteWidth(): number {
        return this.size.width * Dashboard.getFractionalWidth();
    }

    /**
     * Gets the fractional height of the Area.
     *
     * @returns The fractional Height of the Area.
     *
     * @see {@link size}
     * @see {@link getSize | getSize()}
     * @see {@link getAbsoluteHeight | getAbsoluteHeight()}
     * @see {@link getWidth | getWidth()}
     */
    public getHeight(): number {
        return this.size.height;
    }

    /**
     * Gets the absolute height of the Area in pixels.
     *
     * @returns The absolute Height (in pixels) of the Area.
     *
     * @see {@link size}
     * @see {@link getSize | getSize()}
     * @see {@link getHeight | getHeight()}
     * @see {@link getAbsoluteWidth | getAbsoluteWidth()}
     */
    public getAbsoluteHeight(): number {
        return this.size.height * Dashboard.getFractionalHeight();
    }

    /**
     * Returns the fractional Size of the Area, as an object of type
     * {@link Size}.
     *
     * @returns The Size (fractional/relative) of the Area.
     *
     * @see {@link size}
     * @see {@link getHeight | getHeight()}
     * @see {@link getAbsoluteHeight | getHeight()}
     * @see {@link getWidth | getWidth()}
     * @see {@link getAbsoluteWidth | getAbsoluteWidth()}
     * @see {@link setSize | setSize()}
     */
    public getSize(): Size {
        return this.size;
    }

    /**
     * Sets the Area's current Size from an input.
     *
     * @remarks
     * This setter deals with both absolute and fractional sizes. If an absolute
     * Size is passed, it is converted to fractional units to be stored as such.
     * As such, the {@link size} member will always store a size in units.
     *
     * @param size - The input size to set for the Area.
     *
     * @example
     *
     * ```ts
     * areaOne.setSize({width: 1, height: 1});
     * ```
     *
     * Sets `areaOne`'s size to be one unit wide and tall
     *
     * @see {@link Size#isAbsolute}
     * @see {@link setPosition | setPosition()}
     */
    public setSize(size: Size): void {
        if (size.isAbsolute) {
            // ? Rounds the width and height to the nearest dashboard fractional unit
            this.size = {
                width: Math.round(size.width / Dashboard.getFractionalWidth()),
                height: Math.round(
                    size.height / Dashboard.getFractionalHeight(),
                ),
            };
        } else {
            this.size = size;
        }
    }
}

export { Area, AreaInstance, Coordinates, Offset, Size };

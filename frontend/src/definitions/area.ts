// import * as get from "../accessors.js";
// import { dashboard } from "../app.js";
import { Dashboard } from "./dashboard.js";

/**
 * @description: A Coordinate object, stores the x and y positions of the item they belong to.
 *
 *  @property {isAbsolute} - This member is passed when we are passing these types in functions and constructors. Having this optional member allows us to be able to instantiate and pass Areas and Coordinates in both fractional and absolute units without having to (a) do a lot of calculations in the function call scope, or (b) take in an extra parameter in the functions.
 * @this Coordinate */
interface Coordinate {
    x: number;
    y: number;
    isAbsolute?: boolean;
}

/**
 * @description: A Size object, stores the width and height of the item they belong to.
 *
 * @property {isAbsolute} - This member is passed when we are passing these types in functions and constructors. Having this optional member allows us to be able to instantiate and pass Areas and Sizes in both fractional and absolute units without having to (a) do a lot of calculations in the function call scope, or (b) take in an extra parameter in the functions.
 * @this Size */
interface Size {
    width: number;
    height: number;
    isAbsolute?: boolean;
}

/**
 * @description: A RotationOffset object, stores the offset in degrees and offset to any shadow if needed. This is declared to make functions and eliminating code repetition easier.
 *
 * @this Size */
interface Offset {
    rotation: {
        x: number;
        y: number;
    };
    shadow: {
        x: number;
        y: number;
    };
}

/**
 * @description: A type that defines the structure of a @type {Area} in its stored format, either in localStorage or the cloud. It is stored in fractional units to later be instantiated appropriately
 *
 * @this AreaInstance */
interface AreaInstance {
    pos: Coordinate;
    size: Size;
};


/**
 * @description: This is the Area class. This class holds all information for a Panel or other object, with relevant and helpful methods and members.
 *
 * @class Area
 */
class Area {
    /**
     * @description: This is a contingency static member used when a Panel needs to be initialised from scratch and either (a) does not have an Area or (b) has one that will be changed right after.
     *
     * @static
     * @memberof Area
     */
    static readonly INIT = new Area({ x: 0, y: 0 }, { width: 1, height: 1 });

    /**
     * @description: Position of this Area.
     *
     * @private
     * @type {Coordinate}
     * @memberof Area
     */
    private pos: Coordinate;
    /**
     * @description: Size of this Area.
     *
     * @private
     * @type {Size}
     * @memberof Area
     */
    private size: Size;

    /**
     * @description: Creates an instance of Area.
     * NOTE: If @param {arg0} is a Coordinate, then we are creating an Area with an input of both a Coordinate and a Size.
     * POINT: If @param {arg0} is of @type {Area}, then @param {arg1} is disregarded, and a new area is instantiated/created as a copy of the other. A console warning is sent out to inform of this. This is an unused instantiation method so far, and will be removed if it remains unused, sticking to Coord-Size instantiation.
     * NOTE: @param {arg1} is set as optional so that we do not have to input a dummy @param {arg1} if instantiating with another Area
     *
     * @constructor
     * @param {(Coordinate | Area)} arg0
     * @param {Size} [arg1]
     * @memberof Area
     */
    public constructor(arg0: Coordinate | Area, arg1?: Size) {
        // INFO: If the passed @param {arg0} is a full Area
        if (arg0 instanceof Area) {
            // INFO: If we passed an extra Size despite passing a full Area, it is announced and discarded.
            if (arg1 != null) {
                console.warn(
                    "Second parameter is unused. First argument (arg0) was a complete Area. To create a new Area with the coordinates of the first parameter and the size in the second parameter, use arg0.getPos()."
                );
            }

            this.pos = arg0.pos;
            this.size = arg0.size;

            // INFO: If the passed @param {arg0} is only a Coordinate
        } else if (!(arg0 instanceof Area)) {
            // INFO: The absolute/fractional nature is dealt with in setCoordinates()
            this.setCoordinates(arg0);

            // INFO: If the user passed only a Coordinate and no second parameter, a default size is created, and it is announced
            if (arg1 == null) {
                this.size = { width: 1, height: 1 };

                console.warn(
                    "No size passed. Area will be initialised with a width and height of 1 fraction."
                );
            } else {
                // INFO: The absolute/fractional nature is dealt with in setSize()
                this.setSize(arg1);
            }
        }
    }

    /**
     * @description: Returns the X (horizontal) coordinate of the Area
     *
     * @return  {number}
     * @memberof Area
     */
    public getX(): number {
        return this.pos.x;
    }

    /**
     * @description: Returns the X (horizontal) coordinate of the Area in pixels
     *
     * @return  {number}
     * @memberof Area
     */
    public getAbsoluteX(): number {
        return this.pos.x * Dashboard.getFractionalWidth();
    }

    /**
     * @description: Returns the Y (Vertical) coordinate of the Area
     *
     * @return  {number}
     * @memberof Area
     */
    public getY(): number {
        return this.pos.y;
    }

    /**
     * @description: Returns the Y (Vertical) coordinate of the Area in pixels
     *
     * @return  {number}
     * @memberof Area
     */
    public getAbsoluteY(): number {
        return this.pos.y * Dashboard.getFractionalHeight();
    }

    /**
     * @description: Returns the complete position of this Area, as an object of @type {Coordinate}, expressed in absolute pixel quantities.
     *
     * @return  {Coordinate}
     * @memberof Area
     */
    public getCoordinates(): Coordinate {
        return { x: this.pos.x, y: this.pos.y };
    }

    /**
     * @description: Sets the Area's position from an input.
     *
     * @param {Coordinate} coords
     * @memberof Area
     */
    public setCoordinates(coords: Coordinate): void {
        if (coords.isAbsolute) {
            this.pos = {
                x: Math.round(coords.x / Dashboard.getFractionalWidth()),
                y: Math.round(coords.y / Dashboard.getFractionalHeight()),
            };
        } else {
            this.pos = coords;
        }
    }

    /**
     * @description: Gets the fractional width of the Area.
     *
     * @return  {number}
     * @memberof Area
     */
    public getWidth(): number {
        return this.size.width;
    }

    /**
     * @description: Gets the absolute width of the Area in pixels.
     *
     * @return  {number}
     * @memberof Area
     */
    public getAbsoluteWidth(): number {
        return this.size.width * Dashboard.getFractionalWidth();
    }

    /**
     * @description: Gets the fractional height of the Area.
     *
     * @return  {number}
     * @memberof Area
     */
    public getHeight(): number {
        return this.size.height;
    }

    /**
     * @description: Gets the absolute height of the Area in pixels.
     *
     * @return  {number}
     * @memberof Area
     */
    public getAbsoluteHeight(): number {
        return this.size.height * Dashboard.getFractionalHeight();
    }

    /**
     * @description: Returns the fractional Size of this Area, as an object of @type {Size}.
     *
     * @return  {Size}
     * @memberof Area
     */
    public getSize(): Size {
        return this.size;
    }

    /**
     * @description: Sets the Area's current Size from an input.
     *
     * @param {Size} size
     * @memberof Area
     */
    public setSize(size: Size): void {
        if (size.isAbsolute) {
            this.size = {
                width: Math.round(size.width / Dashboard.getFractionalWidth()),
                height: Math.round(size.height / Dashboard.getFractionalHeight()),
            };
        } else {
            this.size = size;
        }
    }

    /**
     * @description: Returns a formatted container of this Area's @member {pos} and @member {size}, useful when storing them.
     *
     * @return  {AreaInstance}
     * @memberof Area
     */
    public toJson(): AreaInstance {
        return {
            pos: this.pos,
            size: this.size,
        };
    }

    /**
     * @description: Returns an Area Object from an input JSON formatted AreaInstance, such as when loading from storage.
     *
     * @return  {Area}
     * @memberof Area
     */
    public static fromJson(json: AreaInstance): Area {
        return new Area(json.pos, json.size);
    }
}

export {
    Offset,
    Coordinate,
    Size,
    AreaInstance,
    Area
};

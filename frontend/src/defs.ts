import * as utils from "./util.js"
import * as get from "./accessors.js"



type Coordinate = {
    x : number, y : number
};

type Size = {
    width : number, height : number
}

enum PanelDataType {
    LOCAL = 0,
    GLOBAL = 1,
    EXTERNAL = 2
}

class Area {

    static readonly INIT = new Area({ x: 0, y: 0 }, { width: 100, height: 100 });

    public constructor(
        private pos : Coordinate,
        private size : Size
    ) {}    

    public getX() : number {
        return this.pos.x;
    }    

    
    public getY() : number {
        return this.pos.y;
    }    

    public getWidth() : number {
        return this.size.width;
    }    

    
    public getHeight() : number {
        return this.size.height;
    }    

    public getCoordinates() : Coordinate {
        return {x: this.pos.x, y: this.pos.y};
    }

    public setCoordinates(coords : Coordinate) : void {
        this.pos.x = coords.x;
        this.pos.y = coords.y;
    }

    public setSize(size : Size) : void {
        this.size.width = size.width;
        this.size.height = size.height;
    }

    public getSize() : Size {
        return this.size;
    }
    
};    

class Theme {

    static readonly DEFAULT = new Theme(0, "default", "/frontend/public/themes/default.css");
    static readonly YELLOW = new Theme(1, "yellow", "/frontend/public/themes/yellow.css");

    private constructor(
        private readonly id: number,
        private readonly name: string,
        private readonly url : string,
    ) {}

    public toString() {
        return this.name;
    }

    public getUrl() {
        return this.url;
    }
}

class PanelType {
    public constructor(
        private readonly typeName : string,
        private readonly typeId : number,
        private readonly dataType : PanelDataType | null = null
    ) {}
}

class Panel extends HTMLElement {

    public constructor(
        private area : Area,
        private type : PanelType,
        // private readonly potentialAspectRatios : number[] | null
    ) { super(); }

    public getArea() : Area {
        return this.area;
    }

    public setPosition(x : number, y : number) : void {
        this.area.setCoordinates({x: x, y: y});

        this.style.setProperty("--x", x + "px");
        this.style.setProperty("--y", y + "px");
    }

    public setSize(width : number, height : number) : void {
        this.area.setSize({width: width, height: height});

        this.style.setProperty("--width", width + "px");
        this.style.setProperty("--height", height + "px");
    }

    public setArea(other : Area) {
        this.area = other;
        
        this.style.setProperty("--x", other.getX() + "px");
        this.style.setProperty("--y", other.getY() + "px");

        this.style.setProperty("--width", other.getWidth() + "px");
        this.style.setProperty("--height", other.getHeight() + "px");
    }

    public setType(type: PanelType) {
        this.type = type;
    }
}

window.customElements.define("panel-element", Panel);

export {
    Coordinate,
    Area,
    Theme,
    Panel,
    PanelType
}
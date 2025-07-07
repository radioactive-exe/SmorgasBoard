import * as utils from "./util.js"
import * as get from "./accessors.js"
import { stringify } from "querystring";



type Coordinate = {
    x : number, y : number
};

type Size = {
    width : number, height : number
}

type AreaInstance = {
    pos: {x : number , y : number},
    size: {width : number, height : number}
}

type PanelInstance = {
    panel_id : number,
    panel_type_id : number,
    area: AreaInstance,
    content : string
}

enum PanelDataType {
    LOCAL = 0,
    GLOBAL = 1,
    EXTERNAL = 2
}

enum PanelTypeId {
    PREVIEW = <number>-1,
    DEFAULT = <number>0
}

enum PanelContent {
    DEFAULT = `<div class="panel-body"><div class="handle drag-handle">
                    <object data="assets/arrows-alt.svg" type="image/svg+xml"></object>
                </div>
                <div class="handle resize-handle">
                    <object data="assets/arrow-up-right-and-arrow-down-left-from-center.svg" type="image/svg+xml"></object>
                </div>
            </div>`
}

class Area {

    static readonly INIT = new Area({ x: 0, y: 0 }, { width: 100, height: 100 });

    private pos : Coordinate;
    private size : Size;

    public constructor(
        arg0 : Coordinate | Area,
        arg1? : Size
    ) {
        if (arg0 instanceof Area) {
            if (arg1 != null) {
                console.warn("Second parameter is unused. First argument (arg0) was a complete Area. To create a new Area with the coordinates of the first parameter and the size in the second parameter, use arg0.getPos().");
            }
            this.pos = arg0.pos;
            this.size = arg0.size;
        }
        else if (!(arg0 instanceof Area) && arg1 == null) {
            console.warn("No size passed. Area will be initialised with a width and height of 0.");
            this.pos = arg0;
            this.size = {width: 0, height: 0};
        }
        else {
            this.pos = arg0;
            this.size = <Size>arg1;
        }
    }    

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

    public toJson() : AreaInstance {
        return {
            pos: this.pos,
            size: this.size
        }
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

    private readonly dataType : PanelDataType;
    private readonly typeName : string;
    
    public constructor(
        private readonly typeId : number,
        arg1? : String | PanelDataType
    ) {
        if (arg1 == null) { this.typeName = PanelTypeId[this.typeId]}
        else if (arg1 instanceof String) {this.typeName = arg1.toString();}
        else if (arg1 in PanelDataType) this.dataType = arg1; 
    }

    public toString() {
        return this.typeName;
    }

    public getId() {
        return this.typeId;
    }
}

class Panel extends HTMLElement {

    private body : string;
    
    public constructor(
        private area : Area,
        private type : PanelType,
        private dashboardId : number,
        body? : string
        // private readonly potentialAspectRatios : number[] | null
    ) { super();
        if (body == null) this.body = this.innerHTML;
        else this.body = body;
        this.setArea(area);
        this.dashboardId = dashboardId;
        this.dataset.panelId = dashboardId.toString();
    }

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
        this.area = new Area(
            other.getCoordinates(), other.getSize()
        );
        
        this.style.setProperty("--x", other.getX() + "px");
        this.style.setProperty("--y", other.getY() + "px");

        this.style.setProperty("--width", other.getWidth() + "px");
        this.style.setProperty("--height", other.getHeight() + "px");
    }

    public setType(type: PanelType) {
        this.type = type;
    }

    public getType() : PanelType {
        return this.type;
    }

    public getContent() : string {
        return this.body;
    }

    public updateContent() : void {
        this.innerHTML = this.body;
    }

    public updateArea() : void {
        this.setArea(
            new Area(
                {
                    x: get.normalisedCssPropertyValue(this, "--x"),
                    y: get.normalisedCssPropertyValue(this, "--y"),
                },
                {
                    width: get.normalisedCssPropertyValue(this, "--width"),
                    height: get.normalisedCssPropertyValue(this, "--height"),
                }
            )
        );
    }
}

window.customElements.define("panel-element", Panel);

export {
    Coordinate,
    Area,
    AreaInstance,
    Theme,
    Panel,
    PanelInstance,
    PanelType,
    PanelDataType,
    PanelContent
}
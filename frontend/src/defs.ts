type Coordinate = {
    x : number, y : number
};

class Area {

    public constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly width: number,
        private readonly height: number
    ) {}    

    public getX() {
        return this.x;
    }    

    
    public getY() : number {
        return this.y;
    }    

    public getWidth() {
        return this.width;
    }    

    
    public getHeight() : number {
        return this.height;
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

export {
    Coordinate,
    Area,
    Theme
}
export declare enum GridType {
    cardinal = 0,
    hex = 1,
    intercardinal = 2
}
export default class Grid {
    static toCoordMap(coords: Array<{
        x: number;
        y: number;
    }>, map?: Map<number, Map<number, any>>, value?: boolean): Map<number, Map<number, any>>;
    walkableTiles: number[];
    unwalkableCoords: Map<number, Map<number, any>>;
    unstoppableCoords: Map<number, Map<number, any>>;
    type: GridType;
    costs: Map<number, number>;
    extraCosts: Map<number, Map<number, number>>;
    tiles: number[][];
    readonly isCardinal: boolean;
    readonly isHex: boolean;
    readonly isIntercardinal: boolean;
    private pTiles;
    constructor({ tiles, walkableTiles, unwalkableCoords, unstoppableCoords, type }: {
        tiles: number[][];
        walkableTiles?: number[];
        unwalkableCoords?: Map<number, Map<number, boolean>>;
        unstoppableCoords?: Map<number, Map<number, boolean>>;
        type?: GridType;
    });
    inGrid(x: number, y: number): boolean;
    isCoordStoppable(x: number, y: number): boolean;
    isCoordWalkable(x: number, y: number): boolean;
    getCoordCost(x: number, y: number): number;
    setTileCost(tile: number, cost: number): void;
    addExtraCost(x: number, y: number, cost: number): void;
    removeExtraCost(x: number, y: number): void;
    clearExtraCosts(): void;
    addUnwalkableCoord(x: number, y: number): void;
    removeUnwalkableCoord(x: number, y: number): void;
    clearUnwalkableCoords(): void;
    addUnstoppableCoord(x: number, y: number): void;
    removeUnstoppableCoord(x: number, y: number): void;
    clearUnstoppableCoords(): void;
    private addCoord;
    private removeCoord;
    private clearCoords;
}

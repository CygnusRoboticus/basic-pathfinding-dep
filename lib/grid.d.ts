export default class Grid {
    constructor({ tiles, walkableTiles }: {
        tiles: Array<Array<number>>;
        walkableTiles?: Array<number>;
    });
    walkableTiles: Array<number>;
    unwalkableCoords: Map<number, Map<number, any>>;
    private _tiles;
    costs: Map<number, number>;
    extraCosts: Map<number, Map<number, number>>;
    tiles: number[][];
    isCoordWalkable(x: number, y: number): boolean;
    getCoordCost(x: number, y: number): number;
    setTileCost(tile: number, cost: number): void;
    addExtraCost(x: number, y: number, cost: number): void;
    removeExtraCost(x: number, y: number): void;
    addUnwalkableCoord(x: number, y: number): void;
    removeUnwalkableCoord(x: number, y: number): void;
    clearUnwalkableCoords(): void;
}

export default class Grid {
  constructor({
    tiles = [],
    walkableTiles = []
  }: {
    tiles: Array<Array<number>>,
    walkableTiles?: Array<number>
  }) {
    this.costs = new Map<number, number>();
    this.extraCosts = new Map<number, Map<number, number>>();
    this.unwalkableCoords = new Map<number, Map<number, any>>();
    this.unstoppableCoords = new Map<number, Map<number, any>>();

    this._tiles = [];
    this.tiles = tiles;
    this.walkableTiles = walkableTiles;
  }

  walkableTiles: Array<number>;
  unwalkableCoords: Map<number, Map<number, any>>;
  unstoppableCoords: Map<number, Map<number, any>>;

  private _tiles: Array<Array<number>>;
  costs: Map<number, number>;
  extraCosts: Map<number, Map<number, number>>;

  get tiles() {
    return this._tiles;
  }
  set tiles(tiles) {
    this._tiles = tiles;

    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        if (!this.costs.get(tiles[y][x])) {
          this.costs.set(tiles[y][x], 1);
        }
      }
    }
  }

  isCoordStoppable(x: number, y: number) {
    const unstoppable = this.unstoppableCoords.has(y) &&
      this.unstoppableCoords.get(y)!.has(x);
    return !unstoppable && this.isCoordWalkable(x, y);
  }

  isCoordWalkable(x: number, y: number) {
    const unwalkable = this.unwalkableCoords.has(y) &&
      this.unwalkableCoords.get(y)!.has(x);
    return !unwalkable && this.walkableTiles.indexOf(this.tiles[y][x]) !== -1;
  }

  getCoordCost(x: number, y: number): number {
    const extraCost = this.extraCosts.has(y) && this.extraCosts.get(y)!.get(x);
    return extraCost || this.costs.get(this.tiles[y][x])!;
  }

  setTileCost(tile: number, cost: number) {
    this.costs.set(tile, cost);
  }

  addExtraCost(x: number, y: number, cost: number) {
    this.addCoord(this.extraCosts, x, y, cost);
  }
  removeExtraCost(x: number, y: number) {
    this.removeCoord(this.extraCosts, x, y);
  }
  clearExtraCosts() {
    this.clearCoords(this.extraCosts);
  }

  addUnwalkableCoord(x: number, y: number) {
    this.addCoord(this.unwalkableCoords, x, y);
  }
  removeUnwalkableCoord(x: number, y: number) {
    this.removeCoord(this.unwalkableCoords, x, y);
  }
  clearUnwalkableCoords() {
    this.clearCoords(this.unwalkableCoords);
  }

  addUnstoppableCoord(x: number, y: number) {
    this.addCoord(this.unstoppableCoords, x, y);
  }
  removeUnstoppableCoord(x: number, y: number) {
    this.removeCoord(this.unstoppableCoords, x, y);
  }
  clearUnstoppableCoords() {
    this.clearCoords(this.unstoppableCoords);
  }

  private addCoord(map: Map<number, Map<number, any>>, x: number, y: number, value: any = true) {
    if (!map.has(y)) {
      map.set(y, new Map<number, any>());
    }
    map.get(y)!.set(x, value);
  }

  private removeCoord(map: Map<number, Map<number, any>>, x: number, y: number) {
    if (map.has(y)) {
      map.get(y)!.delete(x);
    }
  }

  private clearCoords(map: Map<number, any>) {
    map.clear();
  }
}

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
    this.unwalkableCoords = new Map<number, Map<number, any>>()

    this._tiles = [];
    this.tiles = tiles;
    this.walkableTiles = walkableTiles;
  }

  walkableTiles: Array<number>;
  unwalkableCoords: Map<number, Map<number, any>>;

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

  isCoordWalkable(x: number, y: number) {
    const unwalkable =
      this.unwalkableCoords.has(y) &&
      this.unwalkableCoords.get(y)!.get(x);
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
    if (!this.extraCosts.has(y)) {
      this.extraCosts.set(y, new Map<number, number>());
    }
    this.extraCosts.get(y)!.set(x, cost);
  }

  removeExtraCost(x: number, y: number) {
    if (this.extraCosts.has(y)) {
      this.extraCosts.get(y)!.delete(x);
    }
  }

  addUnwalkableCoord(x: number, y: number) {
    if (!this.unwalkableCoords.has(y)) {
      this.unwalkableCoords.set(y, new Map<number, number>());
    }
    this.unwalkableCoords.get(y)!.set(x, true);
  }

  removeUnwalkableCoord(x: number, y: number) {
    if (this.unwalkableCoords.has(y)) {
      this.unwalkableCoords.get(y)!.delete(x);
    }
  }

  clearUnwalkableCoords() {
    this.unwalkableCoords.clear();
  }
}

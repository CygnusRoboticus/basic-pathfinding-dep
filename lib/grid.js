"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = /** @class */ (function () {
    function Grid(_a) {
        var _b = _a.tiles, tiles = _b === void 0 ? [] : _b, _c = _a.walkableTiles, walkableTiles = _c === void 0 ? [] : _c;
        this.costs = new Map();
        this.extraCosts = new Map();
        this.unwalkableCoords = new Map();
        this.unstoppableCoords = new Map();
        this._tiles = [];
        this.tiles = tiles;
        this.walkableTiles = walkableTiles;
    }
    Object.defineProperty(Grid.prototype, "tiles", {
        get: function () {
            return this._tiles;
        },
        set: function (tiles) {
            this._tiles = tiles;
            for (var y = 0; y < tiles.length; y++) {
                for (var x = 0; x < tiles[y].length; x++) {
                    if (!this.costs.get(tiles[y][x])) {
                        this.costs.set(tiles[y][x], 1);
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype.isCoordStoppable = function (x, y) {
        var unstoppable = this.unstoppableCoords.has(y) &&
            this.unstoppableCoords.get(y).has(x);
        return !unstoppable && this.isCoordWalkable(x, y);
    };
    Grid.prototype.isCoordWalkable = function (x, y) {
        var unwalkable = this.unwalkableCoords.has(y) &&
            this.unwalkableCoords.get(y).has(x);
        return !unwalkable && this.walkableTiles.indexOf(this.tiles[y][x]) !== -1;
    };
    Grid.prototype.getCoordCost = function (x, y) {
        var extraCost = this.extraCosts.has(y) && this.extraCosts.get(y).get(x);
        return extraCost || this.costs.get(this.tiles[y][x]);
    };
    Grid.prototype.setTileCost = function (tile, cost) {
        this.costs.set(tile, cost);
    };
    Grid.prototype.addExtraCost = function (x, y, cost) {
        this.addCoord(this.extraCosts, x, y, cost);
    };
    Grid.prototype.removeExtraCost = function (x, y) {
        this.removeCoord(this.extraCosts, x, y);
    };
    Grid.prototype.clearExtraCosts = function () {
        this.clearCoords(this.extraCosts);
    };
    Grid.prototype.addUnwalkableCoord = function (x, y) {
        this.addCoord(this.unwalkableCoords, x, y);
    };
    Grid.prototype.removeUnwalkableCoord = function (x, y) {
        this.removeCoord(this.unwalkableCoords, x, y);
    };
    Grid.prototype.clearUnwalkableCoords = function () {
        this.clearCoords(this.unwalkableCoords);
    };
    Grid.prototype.addUnstoppableCoord = function (x, y) {
        this.addCoord(this.unstoppableCoords, x, y);
    };
    Grid.prototype.removeUnstoppableCoord = function (x, y) {
        this.removeCoord(this.unstoppableCoords, x, y);
    };
    Grid.prototype.clearUnstoppableCoords = function () {
        this.clearCoords(this.unstoppableCoords);
    };
    Grid.prototype.addCoord = function (map, x, y, value) {
        if (value === void 0) { value = true; }
        if (!map.has(y)) {
            map.set(y, new Map());
        }
        map.get(y).set(x, value);
    };
    Grid.prototype.removeCoord = function (map, x, y) {
        if (map.has(y)) {
            map.get(y).delete(x);
        }
    };
    Grid.prototype.clearCoords = function (map) {
        map.clear();
    };
    return Grid;
}());
exports.default = Grid;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = /** @class */ (function () {
    function Grid(_a) {
        var _b = _a.tiles, tiles = _b === void 0 ? [] : _b, _c = _a.walkableTiles, walkableTiles = _c === void 0 ? [] : _c;
        this.costs = new Map();
        this.extraCosts = new Map();
        this.unwalkableCoords = new Map();
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
    Grid.prototype.isCoordWalkable = function (x, y) {
        var unwalkable = this.unwalkableCoords.has(y) &&
            this.unwalkableCoords.get(y).get(x);
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
        if (!this.extraCosts.has(y)) {
            this.extraCosts.set(y, new Map());
        }
        this.extraCosts.get(y).set(x, cost);
    };
    Grid.prototype.removeExtraCost = function (x, y) {
        if (this.extraCosts.has(y)) {
            this.extraCosts.get(y).delete(x);
        }
    };
    Grid.prototype.addUnwalkableCoord = function (x, y) {
        if (!this.unwalkableCoords.has(y)) {
            this.unwalkableCoords.set(y, new Map());
        }
        this.unwalkableCoords.get(y).set(x, true);
    };
    Grid.prototype.removeUnwalkableCoord = function (x, y) {
        if (this.unwalkableCoords.has(y)) {
            this.unwalkableCoords.get(y).delete(x);
        }
    };
    Grid.prototype.clearUnwalkableCoords = function () {
        this.unwalkableCoords.clear();
    };
    return Grid;
}());
exports.default = Grid;

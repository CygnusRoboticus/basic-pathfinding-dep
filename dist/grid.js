"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GridType;
(function (GridType) {
    GridType[GridType["cardinal"] = 0] = "cardinal";
    GridType[GridType["hex"] = 1] = "hex";
    GridType[GridType["intercardinal"] = 2] = "intercardinal";
})(GridType = exports.GridType || (exports.GridType = {}));
var Grid = /** @class */ (function () {
    function Grid(_a) {
        var _b = _a.tiles, tiles = _b === void 0 ? [] : _b, _c = _a.walkableTiles, walkableTiles = _c === void 0 ? [] : _c, _d = _a.unwalkableCoords, unwalkableCoords = _d === void 0 ? new Map() : _d, _e = _a.unstoppableCoords, unstoppableCoords = _e === void 0 ? new Map() : _e, _f = _a.type, type = _f === void 0 ? GridType.cardinal : _f;
        this.costs = new Map();
        this.extraCosts = new Map();
        this.unwalkableCoords = unwalkableCoords;
        this.unstoppableCoords = unstoppableCoords;
        this.type = type;
        this.pTiles = [];
        this.tiles = tiles;
        this.walkableTiles = walkableTiles;
    }
    Grid.toCoordMap = function (coords, map, value) {
        if (map === void 0) { map = new Map(); }
        if (value === void 0) { value = true; }
        coords.forEach(function (_a) {
            var x = _a.x, y = _a.y;
            if (!map.has(y)) {
                map.set(y, new Map());
            }
            map.get(y).set(x, value);
        });
        return map;
    };
    Object.defineProperty(Grid.prototype, "tiles", {
        get: function () {
            return this.pTiles;
        },
        set: function (tiles) {
            this.pTiles = tiles;
            for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
                var row = tiles_1[_i];
                for (var x in row) {
                    if (!this.costs.get(row[x])) {
                        this.costs.set(row[x], 1);
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "isCardinal", {
        get: function () {
            return this.type === GridType.cardinal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "isHex", {
        get: function () {
            return this.type === GridType.hex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "isIntercardinal", {
        get: function () {
            return this.type === GridType.intercardinal;
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype.inGrid = function (x, y) {
        return x >= 0 &&
            y >= 0 &&
            y < this.tiles.length &&
            x < this.tiles[y].length;
    };
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

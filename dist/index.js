"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coord_1 = require("./coord");
exports.Coord = coord_1.default;
var grid_1 = require("./grid");
exports.Grid = grid_1.default;
var grid_2 = require("./grid");
exports.GridType = grid_2.GridType;
var node_1 = require("./node");
exports.Node = node_1.default;
var pathfinding_1 = require("./pathfinding");
var search_1 = require("./search");
exports.Search = search_1.default;
exports.default = pathfinding_1.default;
if (global) {
    // @ts-ignore
    global.BasicPathfinding = {
        Pathfinding: pathfinding_1.default,
        Coord: coord_1.default,
        Grid: grid_1.default,
        GridType: grid_2.GridType,
        Node: node_1.default,
        Search: search_1.default
    };
}

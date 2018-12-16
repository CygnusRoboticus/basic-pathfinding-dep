"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Heap = require('heap');
var coord_1 = require("./coord");
var Search = /** @class */ (function () {
    function Search(_a) {
        var startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, costThreshold = _a.costThreshold;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.costThreshold = costThreshold;
        this.cache = new Map();
        this.nodeQueue = new Heap(function (a, b) {
            return a.guessTotalCost - b.guessTotalCost;
        });
    }
    Search.prototype.push = function (node) {
        this.nodeQueue.push(node);
    };
    Object.defineProperty(Search.prototype, "traversedNodes", {
        get: function () {
            var nodes = [];
            this.cache.forEach(function (map, y) {
                map.forEach(function (node, x) {
                    nodes.push(new coord_1.default(x, y));
                });
            });
            return nodes;
        },
        enumerable: true,
        configurable: true
    });
    Search.prototype.cacheNode = function (node) {
        this.cache.get(node.y).set(node.x, node);
    };
    return Search;
}());
exports.default = Search;

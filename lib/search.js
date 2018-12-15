"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Heap = require('heap');
var Search = /** @class */ (function () {
    function Search(_a) {
        var startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, costThreshold = _a.costThreshold;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.costThreshold = costThreshold;
        this.nodeCache = new Map();
        this.nodeQueue = new Heap(function (a, b) {
            return a.guessTotalCost - b.guessTotalCost;
        });
    }
    Search.prototype.push = function (node) {
        this.nodeQueue.push(node);
    };
    return Search;
}());
exports.default = Search;

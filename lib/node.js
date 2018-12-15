"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(_a) {
        var parent = _a.parent, x = _a.x, y = _a.y, cost = _a.cost, distanceToTarget = _a.distanceToTarget;
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.cost = cost;
        this.distanceToTarget = distanceToTarget;
        this.visited = false;
    }
    Object.defineProperty(Node.prototype, "guessTotalCost", {
        get: function () {
            return this.cost + this.distanceToTarget;
        },
        enumerable: true,
        configurable: true
    });
    return Node;
}());
exports.default = Node;

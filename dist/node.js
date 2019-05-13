"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coord_1 = require("./coord");
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
    Node.prototype.formatPath = function () {
        var path = [];
        path.push(new coord_1.default(this.x, this.y));
        var parent = this.parent;
        while (parent) {
            path.push(new coord_1.default(parent.x, parent.y));
            parent = parent.parent;
        }
        path.reverse();
        return path;
    };
    return Node;
}());
exports.default = Node;

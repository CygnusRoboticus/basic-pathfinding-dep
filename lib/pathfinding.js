"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = require("./search");
var node_1 = require("./node");
var coord_1 = require("./coord");
var Pathfinding = /** @class */ (function () {
    function Pathfinding() {
    }
    Pathfinding.findPath = function (grid, startX, startY, endX, endY, costThreshold) {
        return __awaiter(this, void 0, void 0, function () {
            var search, startNode, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (startX === endX && startY === endY) {
                            return [2 /*return*/, []];
                        }
                        else if (!grid.isCoordStoppable(endX, endY)) {
                            return [2 /*return*/, null];
                        }
                        search = new search_1.default({
                            startX: startX, startY: startY, endX: endX, endY: endY, costThreshold: costThreshold
                        });
                        startNode = Pathfinding.coordinateToNode(search, null, startX, startY, 0);
                        search.push(startNode);
                        return [4 /*yield*/, Pathfinding.calculate(search, grid)];
                    case 1:
                        _a.sent();
                        node = search.nodeQueue.pop();
                        return [2 /*return*/, node ?
                                node.formatPath() :
                                null];
                }
            });
        });
    };
    Pathfinding.findReachable = function (grid, x, y, costThreshold) {
        return __awaiter(this, void 0, void 0, function () {
            var search, startNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        search = new search_1.default({
                            startX: x, startY: y, costThreshold: costThreshold
                        });
                        startNode = Pathfinding.coordinateToNode(search, null, x, y, 0);
                        search.push(startNode);
                        return [4 /*yield*/, Pathfinding.calculate(search, grid)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, search.traversedNodes.
                                filter(function (node) { return grid.isCoordStoppable(node.x, node.y); }).
                                map(function (node) { return new coord_1.default(node.x, node.y); })];
                }
            });
        });
    };
    Pathfinding.calculate = function (search, grid) {
        return new Promise(function (resolve) {
            while (true) {
                //fully traversed
                if (search.nodeQueue.size() === 0) {
                    resolve(search);
                    return;
                }
                var node = search.nodeQueue.peek();
                //path found
                if (search.endX === node.x && search.endY === node.y) {
                    resolve(search);
                    return;
                }
                node = search.nodeQueue.pop();
                node.visited = true;
                if (node.y > 0) {
                    Pathfinding.checkAdjacentNode(search, grid, node, 0, -1);
                }
                if (node.x < grid.tiles[node.y].length - 1) {
                    Pathfinding.checkAdjacentNode(search, grid, node, 1, 0);
                }
                if (node.y < grid.tiles.length - 1) {
                    Pathfinding.checkAdjacentNode(search, grid, node, 0, 1);
                }
                if (node.x > 0) {
                    Pathfinding.checkAdjacentNode(search, grid, node, -1, 0);
                }
            }
        });
    };
    Pathfinding.checkAdjacentNode = function (search, grid, sourceNode, x, y) {
        var adjacentX = sourceNode.x + x;
        var adjacentY = sourceNode.y + y;
        var adjacentCost = grid.getCoordCost(adjacentX, adjacentY);
        if (grid.isCoordWalkable(adjacentX, adjacentY) &&
            Pathfinding.canAfford(sourceNode, adjacentCost, search.costThreshold)) {
            var adjacentNode = Pathfinding.coordinateToNode(search, sourceNode, adjacentX, adjacentY, adjacentCost);
            if (!adjacentNode.visited) {
                search.push(adjacentNode);
            }
            else if (sourceNode.cost + adjacentCost < adjacentNode.cost) {
                adjacentNode.cost = sourceNode.cost + adjacentCost;
                adjacentNode.parent = sourceNode;
                search.nodeQueue.updateItem(adjacentNode);
            }
        }
    };
    Pathfinding.canAfford = function (sourceNode, cost, costThreshold) {
        if (costThreshold != null) {
            return sourceNode.cost + cost <= costThreshold;
        }
        return true;
    };
    Pathfinding.coordinateToNode = function (search, parent, x, y, cost) {
        if (search.nodeCache.has(y)) {
            if (search.nodeCache.get(y).has(x)) {
                return search.nodeCache.get(y).get(x);
            }
        }
        else {
            search.nodeCache.set(y, new Map());
        }
        var node = new node_1.default({
            parent: parent,
            x: x,
            y: y,
            cost: parent ? parent.cost + cost : cost,
            distanceToTarget: search.endX && search.endY ?
                Pathfinding.getDistance(x, y, search.endX, search.endY) :
                1
        });
        search.cacheNode(node);
        return node;
    };
    Pathfinding.getDistance = function (x1, y1, x2, y2) {
        var dx = Math.abs(x1 - x2);
        var dy = Math.abs(y1 - y2);
        return dx + dy;
    };
    return Pathfinding;
}());
exports.default = Pathfinding;

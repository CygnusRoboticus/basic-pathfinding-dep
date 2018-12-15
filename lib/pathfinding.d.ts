import Search from './search';
import Grid from './grid';
import Node from './node';
import Coord from './coord';
export default class Pathfinding {
    static findPath(grid: Grid, startX: number, startY: number, endX: number, endY: number, costThreshold?: number): Promise<Coord[] | null>;
    static findReachable(grid: Grid, x: number, y: number, costThreshold?: number): Promise<Coord[]>;
    static calculate(grid: Grid, search: Search): Search;
    static getCoordCost(grid: Grid, x: number, y: number): number;
    static isCoordWalkable(grid: Grid, x: number, y: number): boolean;
    static checkAdjacentNode(grid: Grid, search: Search, sourceNode: Node, x: number, y: number): void;
    static canAfford(sourceNode: Node, cost: number, costThreshold?: number): boolean;
    static coordinateToNode(search: Search, parent: Node | null, x: number, y: number, cost: number): Node;
    static getDistance(x1: number, y1: number, x2: number, y2: number): number;
}

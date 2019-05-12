import Coord from './coord';
import Grid from './grid';
import Node from './node';
import Search from './search';
export default class Pathfinding {
    static findPath(grid: Grid, startX: number, startY: number, endX: number, endY: number, costThreshold?: number): Promise<any>;
    static findWalkable(grid: Grid, coords: Array<{
        x: number;
        y: number;
    }> | {
        x: number;
        y: number;
    }, costThreshold?: number): Promise<Coord[]>;
    static calculate(search: Search, grid: Grid): Promise<Search>;
    static checkAdjacentNode(search: Search, grid: Grid, sourceNode: Node, x: number, y: number): void;
    static canAfford(sourceNode: Node, cost: number, costThreshold?: number): boolean;
    static coordinateToNode(search: Search, parent: Node | null, x: number, y: number, cost: number): Node;
    static getDistance(x1: number, y1: number, x2: number, y2: number): number;
}
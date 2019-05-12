import Coord from './coord';
export default class Node {
    parent: Node | null;
    x: number;
    y: number;
    cost: number;
    distanceToTarget: number;
    visited: boolean;
    readonly guessTotalCost: number;
    constructor({ parent, x, y, cost, distanceToTarget }: {
        parent: Node | null;
        x: number;
        y: number;
        cost: number;
        distanceToTarget: number;
    });
    formatPath(): Coord[];
}

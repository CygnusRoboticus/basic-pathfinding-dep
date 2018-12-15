import Coord from './coord';
export default class Node {
    constructor({ parent, x, y, cost, distanceToTarget }: {
        parent: Node | null;
        x: number;
        y: number;
        cost: number;
        distanceToTarget: number;
    });
    parent: Node | null;
    x: number;
    y: number;
    cost: number;
    distanceToTarget: number;
    visited: boolean;
    readonly guessTotalCost: number;
    formatPath(): Coord[];
}

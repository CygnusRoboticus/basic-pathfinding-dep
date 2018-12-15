import Node from './node';
import Coord from './coord';
export default class Search {
    constructor({ startX, startY, endX, endY, costThreshold }: {
        startX: number;
        startY: number;
        endX?: number;
        endY?: number;
        costThreshold?: number;
    });
    startX: number;
    startY: number;
    endX?: number;
    endY?: number;
    costThreshold?: number;
    nodeCache: Map<number, Map<number, Node>>;
    nodeQueue: any;
    push(node: Node): void;
    readonly traversedNodes: Coord[];
    cacheNode(node: Node): void;
}

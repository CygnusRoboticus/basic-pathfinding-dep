import Coord from './coord';
import Node from './node';
export default class Search {
    startX: number;
    startY: number;
    endX?: number;
    endY?: number;
    costThreshold?: number;
    cache: Map<number, Map<number, Node>>;
    nodeQueue: any;
    readonly traversedNodes: Coord[];
    constructor({ startX, startY, endX, endY, costThreshold }: {
        startX: number;
        startY: number;
        endX?: number;
        endY?: number;
        costThreshold?: number;
    });
    push(node: Node): void;
    cacheNode(node: Node): void;
}

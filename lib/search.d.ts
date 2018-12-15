import Node from './node';
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
}

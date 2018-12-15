const Heap = require('heap');
import Node from './node';
import Coord from './coord';

export default class Search {
  constructor({
    startX,
    startY,
    endX,
    endY,
    costThreshold
  }: {
    startX: number,
    startY: number,
    endX?: number,
    endY?: number,
    costThreshold?: number
  }) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.costThreshold = costThreshold;

    this.nodeCache = new Map<number, Map<number, Node>>();
    this.nodeQueue = new Heap((a: Node, b: Node) => {
      return a.guessTotalCost - b.guessTotalCost;
    });
  }

  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
  costThreshold?: number;

  nodeCache: Map<number, Map<number, Node>>;
  nodeQueue: any;

  push(node: Node) {
    this.nodeQueue.push(node);
  }
}

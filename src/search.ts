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

    this.cache = new Map<number, Map<number, Node>>();
    this.nodeQueue = new Heap((a: Node, b: Node) => {
      return a.guessTotalCost - b.guessTotalCost;
    });
  }

  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
  costThreshold?: number;

  cache: Map<number, Map<number, Node>>;
  nodeQueue: any;

  push(node: Node) {
    this.nodeQueue.push(node);
  }

  get traversedNodes(): Coord[] {
    const nodes: Coord[] = [];
    this.cache.forEach((map, y) => {
      map.forEach((node, x) => {
        nodes.push(new Coord(x, y));
      });
    });

    return nodes;
  }

  cacheNode(node: Node) {
    this.cache.get(node.y)!.set(node.x, node);
  }
}

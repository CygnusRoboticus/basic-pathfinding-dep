import Coord from './coord';
import Node from './node';

const Heap = require('heap');

export default class Search {
  public startX: number;
  public startY: number;
  public endX?: number;
  public endY?: number;
  public costThreshold?: number;

  public cache: Map<number, Map<number, Node>>;
  public nodeQueue: any;

  get traversedNodes(): Coord[] {
    const nodes: Coord[] = [];
    this.cache.forEach((map, y) => {
      map.forEach((node, x) => {
        nodes.push(new Coord(x, y));
      });
    });

    return nodes;
  }

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

  public push(node: Node) {
    this.nodeQueue.push(node);
  }

  public cacheNode(node: Node) {
    this.cache.get(node.y)!.set(node.x, node);
  }
}

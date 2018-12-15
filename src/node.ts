export default class Node {
  constructor({
    parent,
    x,
    y,
    cost,
    distanceToTarget
  }: {
    parent: Node | null,
    x: number,
    y: number,
    cost: number,
    distanceToTarget: number
  }) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.cost = cost;
    this.distanceToTarget = distanceToTarget;
    this.visited = false;
  }

  parent: Node | null;
  x: number;
  y: number;
  cost: number;
  distanceToTarget: number;
  visited: boolean;

  get guessTotalCost() {
    return this.cost + this.distanceToTarget;
  }
}

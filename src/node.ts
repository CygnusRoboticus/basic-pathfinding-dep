import Coord from './coord';

export default class Node {
  public parent: Node | null;
  public x: number;
  public y: number;
  public cost: number;
  public distanceToTarget: number;
  public visited: boolean;

  get guessTotalCost() {
    return this.cost + this.distanceToTarget;
  }

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

  public formatPath() {
    const path: Coord[] = [];

    path.push(new Coord(this.x, this.y));
    let parent = this.parent;
    while (parent) {
      path.push(new Coord(parent.x, parent.y));
      parent = parent.parent;
    }
    path.reverse();
    return path;
  }
}

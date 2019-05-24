import { ICoord } from './coord';

export class Node {
  public visited: boolean;

  get guessTotalCost(): number {
    return this.cost + this.distanceToTarget;
  }

  constructor(
    public parent: Node | null,
    public x: number,
    public y: number,
    public cost: number,
    public distanceToTarget: number
  ) {
    this.visited = false;
  }

  public formatPath(): ICoord[] {
    const path: ICoord[] = [];

    path.push({ x: this.x, y: this.y });
    let parent = this.parent;
    while (parent) {
      path.push({ x: parent.x, y: parent.y });
      parent = parent.parent;
    }
    path.reverse();
    return path;
  }
}

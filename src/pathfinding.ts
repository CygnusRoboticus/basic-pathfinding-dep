import Search from './search';
import Grid from './grid';
import Node from './node';
import Coord from './coord';

export default class Pathfinding {
  static async findPath(
    grid: Grid,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    costThreshold?: number
  ) {
    if (startX === endX && startY === endY) {
      return [];
    } else if (!Pathfinding.isCoordWalkable(grid, endX, endY)) {
      return null;
    }

    const instance = new Search({
      startX, startY, endX, endY, costThreshold
    });
    const startNode = Pathfinding.coordinateToNode(
      instance, null, startX, startY, 0
    )
    instance.push(startNode);

    await Pathfinding.calculate(grid, instance);

    const node = instance.nodeQueue.pop();

    if (node) {
      const path: Coord[] = [];

      path.push(new Coord(node.x, node.y));
      let parent = node.parent;
      while (parent) {
        path.push(new Coord(parent.x, parent.y));
        parent = parent.parent;
      }
      path.reverse();
      return path;
    }
    return null;
  }

  static async findReachable(
    grid: Grid,
    x: number,
    y: number,
    costThreshold?: number
  ) {
    const instance = new Search({
      startX: x, startY: y, costThreshold
    });
    const startNode = Pathfinding.coordinateToNode(
      instance, null, x, y, 0
    );
    instance.push(startNode);

    await Pathfinding.calculate(grid, instance);

    const nodes: Coord[] = [];
    instance.nodeCache.forEach((map, y) => {
      map.forEach((node, x) => {
        nodes.push(new Coord(x, y));
      });
    });

    return nodes;
  }

  static calculate(grid: Grid, instance: Search): Search {
    while (true) {
      //fully traversed
      if (instance.nodeQueue.size() === 0) {
        return instance;
      }

      let node = instance.nodeQueue.peek();

      //path found
      if (instance.endX === node.x && instance.endY === node.y) {
        return instance;
      }

      node = instance.nodeQueue.pop();

      node.visited = true;
      if (node.y > 0) {
        Pathfinding.checkAdjacentNode(grid, instance, node, 0, -1);
      }
      if (node.x < grid.tiles[node.y].length - 1) {
        Pathfinding.checkAdjacentNode(grid, instance, node, 1, 0);
      }
      if (node.y < grid.tiles.length - 1) {
        Pathfinding.checkAdjacentNode(grid, instance, node, 0, 1);
      }
      if (node.x > 0) {
        Pathfinding.checkAdjacentNode(grid, instance, node, -1, 0);
      }
    }
  }

  static getCoordCost(grid: Grid, x: number, y: number): number {
    const extraCost = grid.extraCosts.has(y) && grid.extraCosts.get(y)!.get(x);
    return extraCost || grid.costs.get(grid.tiles[y][x])!;
  }

  static isCoordWalkable(grid: Grid, x: number, y: number) {
    const unwalkable =
      grid.unwalkableCoords.has(y) &&
      grid.unwalkableCoords.get(y)!.get(x);
    return !unwalkable && grid.walkableTiles.indexOf(grid.tiles[y][x]) !== -1;
  }

  static checkAdjacentNode(
    grid: Grid,
    instance: Search,
    sourceNode: Node,
    x: number,
    y: number
  ): void {
    const adjacentX = sourceNode.x + x;
    const adjacentY = sourceNode.y + y;
    const adjacentCost = Pathfinding.getCoordCost(grid, adjacentX, adjacentY);

    if (
      Pathfinding.isCoordWalkable(grid, adjacentX, adjacentY) &&
      Pathfinding.canAfford(sourceNode, adjacentCost, instance.costThreshold)
    ) {
      const adjacentNode = Pathfinding.coordinateToNode(
        instance,
        sourceNode,
        adjacentX,
        adjacentY,
        adjacentCost
      );

      if (!adjacentNode.visited) {
        instance.push(adjacentNode);
      } else if (sourceNode.cost + adjacentCost < adjacentNode.cost) {
        adjacentNode.cost = sourceNode.cost + adjacentCost;
        adjacentNode.parent = sourceNode;
        instance.nodeQueue.updateItem(adjacentNode);
      }
    }
  }

  static canAfford(
    sourceNode: Node,
    cost: number,
    costThreshold?: number
  ): boolean {
    if (costThreshold != null) {
      return sourceNode.cost + cost <= costThreshold;
    }
    return true;
  }

  static coordinateToNode(
    instance: Search,
    parent: Node | null,
    x: number,
    y: number,
    cost: number
  ): Node {
    if (instance.nodeCache.has(y)) {
      if (instance.nodeCache.get(y)!.has(x)) {
        return instance.nodeCache.get(y)!.get(x)!;
      }
    } else {
      instance.nodeCache.set(y, new Map<number, Node>());
    }

    const node = new Node({
      parent,
      x,
      y,
      cost: parent ? parent.cost + cost : cost,
      distanceToTarget: instance.endX && instance.endY ?
        Pathfinding.getDistance(x, y, instance.endX, instance.endY) :
        1
    });

    instance.nodeCache.get(y)!.set(x, node);
    return node;
  }

  static getDistance(x1: number, y1: number, x2: number, y2: number): number {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    return dx + dy;
  }
}

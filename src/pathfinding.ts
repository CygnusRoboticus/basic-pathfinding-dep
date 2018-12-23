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
    } else if (!grid.isCoordStoppable(endX, endY)) {
      return null;
    }

    const search = new Search({
      startX, startY, endX, endY, costThreshold
    });
    const startNode = Pathfinding.coordinateToNode(
      search, null, startX, startY, 0
    )
    search.push(startNode);

    await Pathfinding.calculate(search, grid);

    const node = search.nodeQueue.pop();
    return node ?
      node.formatPath() :
      null;
  }

  static async findWalkable(
    grid: Grid,
    x: number,
    y: number,
    costThreshold?: number
  ) {
    const search = new Search({
      startX: x, startY: y, costThreshold
    });
    const startNode = Pathfinding.coordinateToNode(
      search, null, x, y, 0
    );
    search.push(startNode);

    await Pathfinding.calculate(search, grid);

    return search.traversedNodes.
      filter(node => grid.isCoordStoppable(node.x, node.y)).
      map(node => new Coord(node.x, node.y));
  }

  static calculate(search: Search, grid: Grid): Promise<Search> {
    return new Promise(resolve => {
      while (true) {
        //fully traversed
        if (search.nodeQueue.size() === 0) {
          resolve(search);
          return;
        }

        let node = search.nodeQueue.peek();

        //path found
        if (search.endX === node.x && search.endY === node.y) {
          resolve(search);
          return;
        }

        node = search.nodeQueue.pop();

        node.visited = true;
        if (node.y > 0) {
          Pathfinding.checkAdjacentNode(search, grid, node, 0, -1);
        }
        if (node.x < grid.tiles[node.y].length - 1) {
          Pathfinding.checkAdjacentNode(search, grid, node, 1, 0);
        }
        if (node.y < grid.tiles.length - 1) {
          Pathfinding.checkAdjacentNode(search, grid, node, 0, 1);
        }
        if (node.x > 0) {
          Pathfinding.checkAdjacentNode(search, grid, node, -1, 0);
        }
      }
    });
  }

  static checkAdjacentNode(
    search: Search,
    grid: Grid,
    sourceNode: Node,
    x: number,
    y: number
  ): void {
    const adjacentX = sourceNode.x + x;
    const adjacentY = sourceNode.y + y;
    const adjacentCost = grid.getCoordCost(adjacentX, adjacentY);

    if (
      grid.isCoordWalkable(adjacentX, adjacentY) &&
      Pathfinding.canAfford(sourceNode, adjacentCost, search.costThreshold)
    ) {
      const adjacentNode = Pathfinding.coordinateToNode(
        search,
        sourceNode,
        adjacentX,
        adjacentY,
        adjacentCost
      );

      if (!adjacentNode.visited) {
        search.push(adjacentNode);
      } else if (sourceNode.cost + adjacentCost < adjacentNode.cost) {
        adjacentNode.cost = sourceNode.cost + adjacentCost;
        adjacentNode.parent = sourceNode;
        search.nodeQueue.updateItem(adjacentNode);
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
    search: Search,
    parent: Node | null,
    x: number,
    y: number,
    cost: number
  ): Node {
    if (search.cache.has(y)) {
      if (search.cache.get(y)!.has(x)) {
        return search.cache.get(y)!.get(x)!;
      }
    } else {
      search.cache.set(y, new Map<number, Node>());
    }

    const node = new Node({
      parent,
      x,
      y,
      cost: parent ? parent.cost + cost : cost,
      distanceToTarget: search.endX && search.endY ?
        Pathfinding.getDistance(x, y, search.endX, search.endY) :
        1
    });

    search.cacheNode(node);
    return node;
  }

  static getDistance(x1: number, y1: number, x2: number, y2: number): number {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    return dx + dy;
  }
}

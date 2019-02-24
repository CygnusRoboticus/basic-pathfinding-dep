import Coord from './coord';
import Grid from './grid';
import Node from './node';
import Search from './search';

export default class Pathfinding {
  public static async findPath(
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
      costThreshold,
      endX,
      endY,
      startX,
      startY
    });
    const startNode = Pathfinding.coordinateToNode(
      search, null, startX, startY, 0
    );
    search.push(startNode);

    await Pathfinding.calculate(search, grid);

    const node = search.nodeQueue.pop();
    return node ?
      node.formatPath() :
      null;
  }

  public static async findWalkable(
    grid: Grid,
    coords: Array<{ x: number, y: number }> | { x: number, y: number },
    costThreshold?: number
  ) {
    coords = coords instanceof Array ? coords : [coords];
    const { x: startX, y: startY } = coords[0];
    const search = new Search({
      costThreshold,
      startX,
      startY
    });
    coords.forEach(({ x, y }) => {
      const node = Pathfinding.coordinateToNode(
        search, null, x, y, 0
      );
      search.push(node);
    });

    await Pathfinding.calculate(search, grid);

    return search.traversedNodes.
      filter((node) => grid.isCoordStoppable(node.x, node.y)).
      map((node) => new Coord(node.x, node.y));
  }

  public static calculate(search: Search, grid: Grid): Promise<Search> {
    return new Promise((resolve) => {
      while (true) {
        // fully traversed
        if (search.nodeQueue.size() === 0) {
          resolve(search);
          return;
        }

        let node = search.nodeQueue.peek();

        // path found
        if (search.endX === node.x && search.endY === node.y) {
          resolve(search);
          return;
        }

        node = search.nodeQueue.pop();

        node.visited = true;
        // cardinal
        if (grid.inGrid(node.x, node.y - 1)) {
          Pathfinding.checkAdjacentNode(search, grid, node, 0, -1);
        }
        // hex & intercardinal
        if (!grid.isCardinal && grid.inGrid(node.x + 1, node.y - 1)) {
          Pathfinding.checkAdjacentNode(search, grid, node, 1, -1);
        }
        // cardinal
        if (grid.inGrid(node.x + 1, node.y)) {
          Pathfinding.checkAdjacentNode(search, grid, node, 1, 0);
        }
        // intercardinal
        if (grid.isIntercardinal && grid.inGrid(node.x + 1, node.y + 1)) {
          Pathfinding.checkAdjacentNode(search, grid, node, 1, 1);
        }
        // cardinal
        if (grid.inGrid(node.x, node.y + 1)) {
          Pathfinding.checkAdjacentNode(search, grid, node, 0, 1);
        }
        // hex & intercardinal
        if (!grid.isCardinal && grid.inGrid(node.x - 1, node.y + 1)) {
          Pathfinding.checkAdjacentNode(search, grid, node, -1, 1);
        }
        // cardinal
        if (grid.inGrid(node.x - 1, node.y)) {
          Pathfinding.checkAdjacentNode(search, grid, node, -1, 0);
        }
        // intercardinal
        if (grid.isIntercardinal && grid.inGrid(node.x - 1, node.y - 1)) {
          Pathfinding.checkAdjacentNode(search, grid, node, -1, -1);
        }
      }
    });
  }

  public static checkAdjacentNode(
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

  public static canAfford(
    sourceNode: Node,
    cost: number,
    costThreshold?: number
  ): boolean {
    if (costThreshold != null) {
      return sourceNode.cost + cost <= costThreshold;
    }
    return true;
  }

  public static coordinateToNode(
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
      cost: parent ? parent.cost + cost : cost,
      distanceToTarget: search.endX && search.endY ?
        Pathfinding.getDistance(x, y, search.endX, search.endY) :
        1,
      parent,
      x,
      y
    });

    search.cacheNode(node);
    return node;
  }

  public static getDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);
    return dx + dy;
  }
}

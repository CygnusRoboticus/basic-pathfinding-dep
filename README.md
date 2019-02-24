# BasicPathfinding

Pathfinding is a simple package for performing 2D [A-star](https://en.wikipedia.org/wiki/A*_search_algorithm) pathfinding in square- and hex-based tile grids.

## Basic Usage

```typescript
import Pathfinding, { Grid } from 'basic-pathfinding';

const grid = new Grid({
  tiles: [
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
  ],
  walkableTiles: [1]
});

const path = await Pathfinding.findPath(grid, 1, 2, 3, 2);
// [
//   { x: 1, y: 2 },
//   { x: 1, y: 3 },
//   { x: 2, y: 3 },
//   { x: 3, y: 3 },
//   { x: 3, y: 2 }
// ]
```

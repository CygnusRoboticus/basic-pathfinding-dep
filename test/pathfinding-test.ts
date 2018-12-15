import "mocha";
import { assert } from "chai";
import Pathfinding, { Grid } from "../src/index";

describe("Pathfinding", function() {
  describe("#findPath", function() {
    it("only traverses walkableTiles", async function() {
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
      assert.deepEqual(path, [
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 3, y: 2 }
      ]);
    });

    it("avoids unwalkableCoords", async function() {
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

      grid.addUnwalkableCoord(2, 3);
      grid.addUnwalkableCoord(3, 3);

      const path = await Pathfinding.findPath(grid, 1, 2, 3, 2);
      assert.deepEqual(path, [
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 4, y: 3 },
        { x: 4, y: 2 },
        { x: 3, y: 2 }
      ]);
    });

    it("early returns when start === end", async function() {
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

      const path = await Pathfinding.findPath(grid, 1, 2, 1, 2);
      assert.deepEqual(path, []);
    });

    it("returns null when it cannot find a path", async function() {
      const grid = new Grid({
        tiles: [
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1]
        ],
        walkableTiles: [1]
      });

      const path = await Pathfinding.findPath(grid, 0, 2, 4, 2);
      assert.isNull(path);
    });

    it("returns null when target is not walkable", async function() {
      const grid = new Grid({
        tiles: [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 0],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1]
        ],
        walkableTiles: [1]
      });

      const path = await Pathfinding.findPath(grid, 0, 2, 4, 2);
      assert.isNull(path);
    });

    it("returns null when target is unwalkable", async function() {
      const grid = new Grid({
        tiles: [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1]
        ],
        walkableTiles: [1]
      });
      grid.addUnwalkableCoord(4, 2);

      const path = await Pathfinding.findPath(grid, 0, 2, 4, 2);
      assert.isNull(path);
    });

    it("returns null when target is unstoppable", async function() {
      const grid = new Grid({
        tiles: [
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1]
        ],
        walkableTiles: [1]
      });
      grid.addUnstoppableCoord(4, 2);

      const path = await Pathfinding.findPath(grid, 0, 2, 4, 2);
      assert.isNull(path);
    });

    it("prefers straight paths", async function() {
      const grid = new Grid({
        tiles: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ],
        walkableTiles: [0]
      });

      const path = await Pathfinding.findPath(grid, 0, 2, 4, 2);
      assert.deepEqual(path, [
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
        { x: 4, y: 2 }
      ]);
    });

    it("respects costs", async function() {
      const grid = new Grid({
        tiles: [
          [0, 2, 2, 2, 0],
          [0, 2, 2, 2, 0],
          [0, 2, 2, 2, 0],
          [0, 1, 1, 1, 0],
          [0, 1, 1, 1, 0]
        ],
        walkableTiles: [0, 1, 2],
      });

      grid.setTileCost(2, 4);

      const path = await Pathfinding.findPath(grid, 0, 2, 4, 2);
      assert.deepEqual(path, [
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 4, y: 2 }
      ]);
    });

    it("respects extraCosts", async function() {
      const grid = new Grid({
        tiles: [
          [0, 2, 2, 2, 0],
          [0, 2, 2, 2, 0],
          [0, 2, 2, 2, 0],
          [0, 1, 1, 1, 0],
          [0, 1, 1, 1, 0]
        ],
        walkableTiles: [0, 1],
      });

      grid.addExtraCost(1, 3, 4);
      grid.addExtraCost(3, 4, 4);

      const path = await Pathfinding.findPath(grid, 0, 2, 4, 2);
      assert.deepEqual(path, [
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 4, y: 2 }
      ]);
    });

    it("cancels early with costThreshold", async function() {
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

      let path = await Pathfinding.findPath(grid, 1, 2, 3, 2, 3);
      assert.isNull(path);
      path = await Pathfinding.findPath(grid, 1, 2, 3, 2, 4);
      assert.deepEqual(path, [
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 3, y: 2 }
      ]);
    });
  });

  describe("#findReachable", function() {
    it("only traverses walkableTiles", async function() {
      const grid = new Grid({
        tiles: [
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [2, 2, 1, 1, 1],
          [1, 1, 1, 1, 1]
        ],
        walkableTiles: [1]
      });

      const path = await Pathfinding.findReachable(grid, 1, 2);
      assert.deepEqual(path, [
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: 0 }
      ]);
    });

    it("avoids unwalkableCoords", async function() {
      const grid = new Grid({
        tiles: [
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1]
        ],
        walkableTiles: [1]
      });

      grid.addUnwalkableCoord(0, 3);
      grid.addUnwalkableCoord(1, 3);

      const path = await Pathfinding.findReachable(grid, 1, 2);
      assert.deepEqual(path, [
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: 0 }
      ]);
    });

    it("avoids unstoppableCoords", async function() {
      const grid = new Grid({
        tiles: [
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1],
          [1, 1, 0, 1, 1]
        ],
        walkableTiles: [1]
      });

      grid.addUnstoppableCoord(0, 3);
      grid.addUnstoppableCoord(1, 3);

      const path = await Pathfinding.findReachable(grid, 1, 2);
      assert.deepEqual(path, [
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 4 },
        { x: 0, y: 4 }
      ]);
    });

    it("cancels early with costThreshold", async function() {
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

      let path = await Pathfinding.findReachable(grid, 1, 2, 1);
      assert.deepEqual(path, [
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
        { x: 1, y: 3 }
      ]);

      path = await Pathfinding.findReachable(grid, 1, 2, 4);
      assert.deepEqual(path, [
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 3, y: 2 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 0, y: 3 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 4 },
        { x: 0, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 4 }
      ]);
    });
  });
});

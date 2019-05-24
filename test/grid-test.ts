import { assert } from 'chai';
import 'mocha';
import { Grid } from '../src/index';

describe('Grid', function() {
  describe('#toCoordMap', function() {
    it('converts list of coords to map of coords', function() {
      const coords = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 }
      ];

      const coordMap = Grid.toCoordMap(coords, true);
      assert.deepEqual(coordMap, new Map([
        [0, new Map([
          [0, true],
          [1, true],
          [2, true]
        ])],
        [1, new Map([
          [0, true]
        ])],
        [2, new Map([
          [0, true],
          [2, true]
        ])]
      ]));
    });

    it('accepts a default map', function() {
      const coords = [
        { x: 0, y: 0 }
      ];
      const defaultMap = new Map([
        [1, new Map([
          [0, false]
        ])]
      ]);

      const coordMap = Grid.toCoordMap<boolean>(coords, true, defaultMap);
      assert.deepEqual(coordMap, new Map([
        [0, new Map<number, boolean>([
          [0, true]
        ])],
        [1, new Map<number, boolean>([
          [0, false]
        ])]
      ]));
    });

    it('accepts a default value', function(): void {
      const coords = [
        { x: 0, y: 0 }
      ];

      const coordMap = Grid.toCoordMap(coords, false, new Map());
      assert.deepEqual(coordMap, new Map([
        [0, new Map([
          [0, false]
        ])]
      ]));
    });
  });
});

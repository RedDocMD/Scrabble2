import Rack from './Rack';
import Tile from './Tile';

let rack: Rack;

beforeEach(() => {
    rack = new Rack();
    rack = rack.add([
        new Tile(1, 'A'),
        new Tile(1, 'A'),
        new Tile(3, 'B'),
        new Tile(3, 'F')
    ]);
});

test('If properly added', () => {
    const tiles = rack.currentTiles();
    expect(tiles[0]).toStrictEqual(new Tile(1, 'A'));
    expect(tiles[1]).toStrictEqual(new Tile(1, 'A'));
    expect(tiles[2]).toStrictEqual(new Tile(3, 'B'));
    expect(tiles[3]).toStrictEqual(new Tile(3, 'F'));
});

test('Add some more', () => {
    rack = rack.add([
        new Tile(1, 'E'),
        new Tile(1, 'I')
    ]);
    expect(rack.length).toEqual(6);
    expect(rack.atIndex(4)).toStrictEqual(new Tile(1, 'E'));
    expect(rack.atIndex(5)).toStrictEqual(new Tile(1, 'I'));
});

test('Remove tile', () => {
    rack = rack.removeAt(2);
    expect(rack.length).toEqual(3);
    const tiles = rack.currentTiles();
    expect(tiles[0]).toStrictEqual(new Tile(1, 'A'));
    expect(tiles[1]).toStrictEqual(new Tile(1, 'A'));
    expect(tiles[2]).toStrictEqual(new Tile(3, 'F'));
});

test('Swap tiles', () => {
    rack = rack.swap(1, 2);
    expect(rack.length).toEqual(4);
    const tiles = rack.currentTiles();
    expect(tiles[0]).toStrictEqual(new Tile(1, 'A'));
    expect(tiles[1]).toStrictEqual(new Tile(3, 'B'));
    expect(tiles[2]).toStrictEqual(new Tile(1, 'A'));
    expect(tiles[3]).toStrictEqual(new Tile(3, 'F'));
});
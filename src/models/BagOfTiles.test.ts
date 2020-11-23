import BagOfTiles from './BagOfTiles';
import Tile from './Tile';

test('Initially bag has 100 tiles', () => {
    const bag = new BagOfTiles(false);
    expect(bag.tileCount).toBe(100);
});

test('Draw 7 tiles, then 5, then 1', () => {
    let bag = new BagOfTiles(false);
    let tiles: Tile[];

    [tiles, bag] = bag.drawTiles(7);
    expect(tiles.length).toBe(7);
    expect(bag.tileCount).toBe(93);

    [tiles, bag] = bag.drawTiles(5);
    expect(tiles.length).toBe(5);
    expect(bag.tileCount).toBe(88);

    [tiles, bag] = bag.drawTiles(1);
    expect(tiles.length).toBe(1);
    expect(bag.tileCount).toBe(87);
});

test('Draw negative tiles', () => {
    const bag = new BagOfTiles(false);
    expect(() => {
        bag.drawTiles(-1);
    }).toThrow('can draw between 1 and 7 tiles (both inclusive)');
});

test('Overdraw tiles', () => {
    let bag = new BagOfTiles(false);
    let tiles: Tile[];
    for (let i = 0; i < 14; i++) {
        [tiles, bag] = bag.drawTiles(7);
    }
    expect(() => {
        bag.drawTiles(5);
    }).toThrow('insufficient tiles');
});
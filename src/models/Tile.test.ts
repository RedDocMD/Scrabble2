import Tile from './Tile';

test('Upper Case, Positive Points', () => {
    const tile = new Tile(2, 'A');
    expect(tile.letter).toBe('A');
    expect(tile.points).toBe(2);
});

test('Lower Case, Positive Points', () => {
    const tile = new Tile(2, 'a');
    expect(tile.letter).toBe('A');
    expect(tile.points).toBe(2);
});

test('Zero Points', () => {
    const tile = new Tile(0, 'A');
    expect(tile.letter).toBe('A');
    expect(tile.points).toBe(0);
});

test('Non Letter', () => {
    expect(() => {
        new Tile(5, 'hello');
    }).toThrow('theLetter must be a single alphabet');
});
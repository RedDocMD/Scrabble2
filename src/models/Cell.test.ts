import { Cell, CellType, CellState } from './Cell';
import Tile from './Tile';

test('Check fresh Cell', () => {
    let cell = new Cell(CellType.Regular);
    expect(cell.state).toEqual(CellState.Empty);
    expect(cell.value).toBeUndefined();
    expect(cell.type).toEqual(CellType.Regular);
})

test('Put tile in empty Cell', () => {
    let cell = new Cell(CellType.Regular);
    let tile = new Tile(10, 'Q');
    let newCell = cell.putTile(tile);
    expect(newCell.type).toEqual(CellType.Regular);
    expect(newCell.state).toEqual(CellState.Filled);
    expect(newCell.value).toStrictEqual(tile);
})

test('Put tile in filled Cell', () => {
    let cell = new Cell(CellType.Regular);
    let tile = new Tile(10, 'Q');
    cell = cell.putTile(tile);
    let newTile = new Tile(10, 'Z');
    expect(() => cell.putTile(newTile)).toThrow();
})

test('Remove tile from filled Cell', () => {
    let cell = new Cell(CellType.Regular);
    let tile = new Tile(10, 'Q');
    cell = cell.putTile(tile);
    cell = cell.removeTile();
    expect(cell.state).toEqual(CellState.Empty);
    expect(cell.value).toBeUndefined();
    expect(cell.type).toEqual(CellType.Regular);
})

test('Remove tile from empty Cell', () => {
    let cell = new Cell(CellType.Regular);
    expect(() => cell.removeTile()).toThrow();
})
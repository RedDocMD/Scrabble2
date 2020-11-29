import {Board, Word} from './Board';
import DummyBoard from './DummyBoard';
import Tile from './Tile';

let board: Board;

beforeEach(() => {
	board = new Board();
	const leftWord: Word = [
		{tile: new Tile(4, 'W'), row: 7, column: 7},
		{tile: new Tile(1, 'I'), row: 8, column: 7},
		{tile: new Tile(2, 'N'), row: 9, column: 7},
	];
	const interimBoard = board.putWord(leftWord)[1];
	const givenWord: Word = [
		{tile: new Tile(1, 'E'), row: 9, column: 8},
		{tile: new Tile(1, 'R'), row: 9, column: 9},
		{tile: new Tile(2, 'D'), row: 9, column: 10},
	];
	board = interimBoard.putWord(givenWord)[1];
});

test('DummyBoard from nothing', () => {
	const dummy = new DummyBoard();
	expect(dummy.size).toEqual(0);
	expect(dummy.getAddedWord()).toEqual([]);
});

test('Dummy board from Board', () => {
	const dummy = new DummyBoard(board);
	expect(dummy.size).toEqual(board.size);
	expect(dummy.getAddedWord()).toEqual([]);
	for (let i = 0; i < dummy.size; i++) {
		for (let j = 0; j < dummy.size; j++) {
			expect(dummy.getCell(i, j)).toStrictEqual(board.getCell(i, j));
		}
	}
});

test('Add tiles', () => {
	let dummy = new DummyBoard(board);
	dummy = dummy.addTile(new Tile(1, 'A'), 1, 1);
	dummy = dummy.addTile(new Tile(3, 'B'), 13, 10);
	for (let i = 0; i < dummy.size; i++) {
		for (let j = 0; j < dummy.size; j++) {
			if (!((i == 1 && j == 1) || (i == 13 && j == 10))) {
				expect(dummy.getCell(i, j)).toStrictEqual(board.getCell(i, j));
			}
		}
	}
	expect(dummy.getCell(1, 1).value).toStrictEqual(new Tile(1, 'A'));
	expect(dummy.getCell(13, 10).value).toStrictEqual(new Tile(3, 'B'));
	expect(board.getCell(1, 1).value).toBeUndefined();
	expect(board.getCell(13, 10).value).toBeUndefined();
	expect(dummy.getAddedWord()).toStrictEqual([
		{
			tile: new Tile(1, 'A'),
			row: 1,
			column: 1
		},
		{
			tile: new Tile(3, 'B'),
			row: 13,
			column: 10
		}
	]);
});

test('Delete tiles', () => {
	let dummy = new DummyBoard(board);
	dummy = dummy.addTile(new Tile(1, 'A'), 1, 1);
	dummy = dummy.addTile(new Tile(3, 'B'), 13, 10);
	dummy = dummy.removeTile(13, 10);
	for (let i = 0; i < dummy.size; i++) {
		for (let j = 0; j < dummy.size; j++) {
			if (!((i == 1 && j == 1) || (i == 13 && j == 10))) {
				expect(dummy.getCell(i, j)).toStrictEqual(board.getCell(i, j));
			}
		}
	}
	expect(dummy.getCell(1, 1).value).toStrictEqual(new Tile(1, 'A'));
	expect(dummy.getCell(13, 10).value).toBeUndefined();
	expect(board.getCell(1, 1).value).toBeUndefined();
	expect(board.getCell(13, 10).value).toBeUndefined();
	expect(dummy.getAddedWord()).toStrictEqual([
		{
			tile: new Tile(1, 'A'),
			row: 1,
			column: 1
		},
	]);
});

test('Delete tiles previously placed should throw', () => {
	let dummy = new DummyBoard(board);
	dummy = dummy.addTile(new Tile(1, 'A'), 1, 1);
	dummy = dummy.addTile(new Tile(3, 'B'), 13, 10);
	expect(() => dummy.removeTile(9, 7)).toThrow();
});

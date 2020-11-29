import {Board, TilePosition, Word} from './Board';
import {Cell} from './Cell';
import Tile from './Tile';
import deepEqual from 'deep-equal';

export default class DummyBoard {
	private cellMatrix: Cell[][];
	private addedTilesPositions: TilePosition[];
	private _size;

	constructor(board?: Board) {
		if (board) {
			this._size = board.size;
			this.cellMatrix = new Array<Cell[]>(board.size);
			for (let i = 0; i < board.size; i++) {
				this.cellMatrix[i] = new Array<Cell>(board.size);
			}
			for (let i = 0; i < board.size; i++) {
				for (let j = 0; j < board.size; j++) {
					this.cellMatrix[i][j] = board.getCell(i, j).clone();
				}
			}
			this.addedTilesPositions = [];
		} else {
			this._size = 0;
			this.cellMatrix = [];
			this.addedTilesPositions = [];
		}
	}

	clone(): DummyBoard {
		const dummyBoard = new DummyBoard();
		dummyBoard._size = this._size;
		dummyBoard.addedTilesPositions = this.addedTilesPositions.slice();
		dummyBoard.cellMatrix = new Array<Cell[]>(dummyBoard.size);
		for (let i = 0; i < dummyBoard.size; i++) {
			dummyBoard.cellMatrix[i] = new Array<Cell>(dummyBoard.size);
		}
		for (let i = 0; i < this._size; i++) {
			for (let j = 0; j < this._size; j++) {
				dummyBoard.cellMatrix[i][j] = this.cellMatrix[i][j].clone();
			}
		}
		return dummyBoard;
	}

	addTile(tile: Tile, row: number, column: number): DummyBoard {
		const dummyBoard = this.clone();
		dummyBoard.cellMatrix[row][column] = this.cellMatrix[row][column].putTile(tile);
		dummyBoard.addedTilesPositions.push({
			tile: tile,
			row: row,
			column: column
		});
		return dummyBoard;
	}

	private findIndex(tilePos: TilePosition): number | undefined {
		let idx = 0;
		while (idx < this.addedTilesPositions.length) {
			if (deepEqual(tilePos, this.addedTilesPositions[idx])) {
				return idx;
			}
			idx++;
		}
		return undefined;
	}

	removeTile(row: number, column: number): DummyBoard {
		const dummyBoard = this.clone();
		const tile = this.cellMatrix[row][column].value;
		if (tile !== undefined) {
			const idx = this.findIndex({
				tile: tile,
				row: row,
				column: column
			});
			if (idx !== undefined) {
				dummyBoard.cellMatrix[row][column] = this.cellMatrix[row][column].removeTile();
				dummyBoard.addedTilesPositions.splice(idx, 1);
				return dummyBoard;
			} else {
				throw new Error('cannot remove tile not added this round');
			}
		} else {
			throw new Error('cannot remove from empty cell');
		}
	}

	getAddedWord(): Word {
		return this.addedTilesPositions.slice();
	}

	get size(): number {
		return this._size;
	}

	getCell(row: number, column: number): Cell {
		return this.cellMatrix[row][column];
	}
}

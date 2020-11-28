import { Board, TilePosition, Word } from './Board';
import { Cell } from './Cell';
import Tile from './Tile';
import deepEqual from 'deep-equal';

export default class DummyBoard {
    private cellMatrix: Cell[][];
    private addedTilesPositions: TilePosition[];
    private size;

    constructor(board?: Board) {
        if (board) {
            this.size = board.size;
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
            this.size = 0;
            this.cellMatrix = [];
            this.addedTilesPositions = [];
        }
    }

    clone(): DummyBoard {
        const dummyBoard = new DummyBoard();
        dummyBoard.size = this.size;
        dummyBoard.addedTilesPositions = this.addedTilesPositions.slice();
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
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

    removeTile(row: number, column: number): DummyBoard {
        const dummyBoard = this.clone();
        dummyBoard.cellMatrix[row][column] = this.cellMatrix[row][column].removeTile();
        let idx = 0;
        while (idx < dummyBoard.addedTilesPositions.length) {
            if (deepEqual(dummyBoard.addedTilesPositions[idx], this.cellMatrix[row][column])) {
                break;
            }
            idx++;
        }
        dummyBoard.addedTilesPositions = dummyBoard.addedTilesPositions.splice(idx, 1);
        return dummyBoard;
    }

    getAddedWord(): Word {
        return this.addedTilesPositions.slice();
    }
}
import { Cell, CellType } from "./Cell";
import Tile from "./Tile";

export interface TilePosition {
    tile: Tile,
    row: number,
    column: number
}

export type Word = TilePosition[];

export class Board {
    private cells: Cell[][];
    readonly size = 15;

    constructor() {
        this.cells = new Array<Cell[]>(this.size);
        for (let i = 0; i < this.size; i++) {
            this.cells[i] = new Array<Cell>(this.size);
        }

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.cells[i][j] = new Cell(CellType.Regular);
                if ((i === 0 || i === 14) && (j === 3 || j === 11))
                    this.cells[i][j] = new Cell(CellType.DoubleLetter);
                if ((j === 0 || j === 14) && (i === 3 || i === 11))
                    this.cells[i][j] = new Cell(CellType.DoubleLetter);
                if ((i === 1 || i === 13) && (j === 5 || j === 9))
                    this.cells[i][j] = new Cell(CellType.TripleLetter);
                if ((j === 1 || j === 13) && (i === 5 || i === 9))
                    this.cells[i][j] = new Cell(CellType.TripleLetter);
                if ((i === 2 || i === 12) && (j === 6 || j === 8))
                    this.cells[i][j] = new Cell(CellType.DoubleLetter);
                if ((j === 2 || j === 12) && (i === 6 || i === 8))
                    this.cells[i][j] = new Cell(CellType.DoubleLetter);
                if ((i === 3 || i === 11) && j === 7) this.cells[i][j] = new Cell(CellType.DoubleLetter);
                if ((j === 3 || j === 11) && i === 7) this.cells[i][j] = new Cell(CellType.DoubleLetter);
            }
        }
    
        for (let i = 1; i < this.size - 1; i++) {
            for (let j = 1; j < this.size - 1; j++) {
                if (i === j || i + j === this.size - 1) {
                    if (i <= 4 || i >= 10) this.cells[i][j] = new Cell(CellType.DoubleWord);
                    else if (i === 7) this.cells[i][j] = new Cell(CellType.Center);
                    else if (i === 6 || i === 8) this.cells[i][j] = new Cell(CellType.DoubleLetter);
                    else this.cells[i][j] = new Cell(CellType.TripleLetter);
                }
            }
        }
    
        this.cells[0][0] = new Cell(CellType.TripleWord);
        this.cells[0][Math.floor(this.size / 2)] = new Cell(CellType.TripleWord);
        this.cells[0][this.size - 1] = new Cell(CellType.TripleWord);
        this.cells[Math.floor(this.size / 2)][0] = new Cell(CellType.TripleWord);
        this.cells[Math.floor(this.size / 2)][this.size - 1] = new Cell(CellType.TripleWord);
        this.cells[this.size - 1][0] = new Cell(CellType.TripleWord);
        this.cells[this.size - 1][Math.floor(this.size / 2)] = new Cell(CellType.TripleWord);
        this.cells[this.size - 1][this.size - 1] = new Cell(CellType.TripleWord);
    }

    getCell(i: number, j: number) {
        return this.cells[i][j];
    }
}
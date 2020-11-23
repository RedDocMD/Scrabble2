import { Cell, CellType } from "./Cell";
import Tile from "./Tile";

export interface TilePosition {
    tile: Tile,
    row: number,
    column: number
}

export type Word = TilePosition[];

enum Orientation {
    Horizontal,
    Vertical,
    Discontinuous
}

const wordOrientation = (word: Word, size: number) => {
    let rowCounts = new Array<number>(size);
    let columnCounts = new Array<number>(size);
    word.forEach(x => rowCounts[x.row]++);
    word.forEach(x => columnCounts[x.column]++);
    for (let i = 0; i < size; i++) {
        if (rowCounts[i] === size) {
            return Orientation.Horizontal;
        }
    }
    for (let i = 0; i < size; i++) {
        if (columnCounts[i] === size) {
            return Orientation.Vertical;
        }
    }
    return Orientation.Discontinuous;
}

const hasValidIndices = (word: Word, size: number) => {
    let invalidRows = word.map(x => x.row).filter(x => x < 0 || x >= size);
    let invalidColumns = word.map(x => x.column).filter(x => x < 0 || x >= size);
    return invalidRows.length === 0 && invalidColumns.length === 0;
}

interface WordInternal {
    word: Word,
    orientation: Orientation
}

type WordList = WordInternal[];
type IndexList = number[];

export class Board {
    private cells: Cell[][];
    readonly size = 15;
    private words: WordList;
    private wordsPerCell: IndexList[][];

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

        this.words = [];
        
        this.wordsPerCell = new Array<IndexList[]>(this.size);
        for (let i = 0; i < this.size; i++) {
            this.wordsPerCell[i] = new Array<IndexList>(this.size);
            for (let j = 0; j < this.size; j++) {
                this.wordsPerCell[i][j] = [];
            }
        }
    }

    getCell(i: number, j: number) {
        return this.cells[i][j];
    }

    putWord(word: Word) {
        if (word.length === 0) {
            throw new Error('word must have non-zero length');
        }
        if (!hasValidIndices(word, this.size)) {
            throw new Error('invalid indices in word');
        }
        let orientation = wordOrientation(word, this.size);
        if (orientation === Orientation.Horizontal) {
            let row = word[0].row;
            let sortedWord = word.sort((a, b) => a.column - b.column);
        } else if (orientation === Orientation.Vertical) {

        } else {
            
        }
    }
}
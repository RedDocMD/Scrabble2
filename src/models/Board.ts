import { Cell, CellType } from './Cell';
import Tile from './Tile';

export interface TilePosition {
    tile: Tile,
    row: number,
    column: number
}

export type Word = TilePosition[];

enum Orientation {
    Horizontal,
    Vertical,
    Discontinuous,
    None
}

const wordOrientation = (word: Word, size: number) => {
    const rowCounts = new Array<number>(size);
    const columnCounts = new Array<number>(size);
    for (let i = 0; i < size; i++) {
        rowCounts[i] = columnCounts[i] = 0;
    }
    word.forEach(x => rowCounts[x.row]++);
    word.forEach(x => columnCounts[x.column]++);
    for (let i = 0; i < size; i++) {
        if (rowCounts[i] === word.length) {
            return Orientation.Horizontal;
        }
    }
    for (let i = 0; i < size; i++) {
        if (columnCounts[i] === word.length) {
            return Orientation.Vertical;
        }
    }
    return Orientation.Discontinuous;
};

const hasValidIndices = (word: Word, size: number) => {
    const invalidRows = word.map(x => x.row).filter(x => x < 0 || x >= size);
    const invalidColumns = word.map(x => x.column).filter(x => x < 0 || x >= size);
    return invalidRows.length === 0 && invalidColumns.length === 0;
};

interface CellWords {
    horizontal: Word | undefined,
    vertical: Word | undefined,
}

export class Board {
    private cells: Cell[][];
    readonly size = 15;
    private wordsPerCell: CellWords[][];

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

        this.wordsPerCell = new Array<CellWords[]>(this.size);
        for (let i = 0; i < this.size; i++) {
            this.wordsPerCell[i] = new Array<CellWords>(this.size);
            for (let j = 0; j < this.size; j++) {
                this.wordsPerCell[i][j] = {
                    horizontal: undefined,
                    vertical: undefined
                };
            }
        }
    }

    getCell(i: number, j: number): Cell {
        return this.cells[i][j];
    }

    private clone(): Board {
        const newBoard = new Board();
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                newBoard.cells[i][j] = this.cells[i][j];
                newBoard.wordsPerCell[i][j] = this.wordsPerCell[i][j];
            }
        }
        return newBoard;
    }

    putWord(word: Word): [Word, Board] {
        // TODO: Also calculate the points in addition to the new board state
        // TODO: Add handling for erroneous placements
        // TODO: Word must touch previous word
        if (word.length === 0) {
            throw new Error('word must have non-zero length');
        }
        if (!hasValidIndices(word, this.size)) {
            throw new Error('invalid indices in word');
        }
        const orientation = wordOrientation(word, this.size);
        if (orientation === Orientation.Horizontal) {
            const row = word[0].row;
            const sortedWord = word.sort((a, b) => a.column - b.column);
            const minCol = sortedWord[0].column;
            const maxCol = sortedWord[sortedWord.length - 1].column;

            const hasLeft = minCol > 0 && this.cells[row][minCol - 1].isFilled();
            const hasRight = maxCol < this.size - 1 && this.cells[row][maxCol + 1].isFilled();

            let leftOrientation = Orientation.None, rightOrientation = Orientation.None;
            if (hasLeft) {
                leftOrientation = this.wordsPerCell[row][minCol - 1].horizontal === undefined ? Orientation.Vertical : Orientation.Horizontal;
            }
            if (hasRight) {
                rightOrientation = this.wordsPerCell[row][maxCol + 1].horizontal === undefined ? Orientation.Vertical : Orientation.Horizontal;
            }

            let startCol = minCol, endCol = maxCol;
            if (hasLeft) {
                if (leftOrientation === Orientation.Horizontal) {
                    const word = this.wordsPerCell[row][minCol - 1].horizontal;
                    if (word !== undefined) {
                        for (let i = word.length - 1; i >= 0; i--) {
                            sortedWord.unshift(word[i]);
                        }
                        startCol = word[0].column;
                    }
                } else {
                    const tile = this.cells[row][minCol - 1].value;
                    if (tile != undefined) {
                        sortedWord.unshift({
                            row: row,
                            column: minCol - 1,
                            tile: tile
                        });
                    }
                    startCol--;
                }
            }
            if (hasRight) {
                if (rightOrientation === Orientation.Horizontal) {
                    const word = this.wordsPerCell[row][maxCol + 1].horizontal;
                    if (word !== undefined) {
                        for (let i = 0; i < word.length; i++) {
                            sortedWord.push(word[i]);
                        }
                        endCol = word[word.length].column;
                    }
                } else {
                    const tile = this.cells[row][maxCol + 1].value;
                    if (tile != undefined) {
                        sortedWord.unshift({
                            row: row,
                            column: maxCol + 1,
                            tile: tile
                        });
                    }
                    endCol++;
                }
            }

            const newBoard = this.clone();
            for (const char of sortedWord) {
                newBoard.cells[char.row][char.column] = new Cell(newBoard.cells[char.row][char.column].type).putTile(char.tile);
            }
            for (let i = startCol; i <= endCol; i++)  {
                newBoard.wordsPerCell[row][i].horizontal = sortedWord;
            }
            
            const newWord = sortedWord.slice();

            return [newWord, newBoard];
        } else if (orientation === Orientation.Vertical) {
            throw new Error('unimplemented');
        } else if (orientation === Orientation.Discontinuous) {
            throw new Error('unimplemented');
        }
        throw new Error('unimplemented');
    }
}
import { Cell,  CellType } from './Cell';
import Tile from './Tile';

export interface TilePosition {
    tile: Tile,
    row: number,
    column: number
}

export type Word = TilePosition[];

const negatedTilePosition = (pos: TilePosition): TilePosition => {
    return {
        row: pos.row,
        column: pos.column,
        tile: pos.tile.negated()
    };
};

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
    return Orientation.None;
};

const hasValidIndices = (word: Word, size: number) => {
    const invalidRows = word.map(x => x.row).filter(x => x < 0 || x >= size);
    const invalidColumns = word.map(x => x.column).filter(x => x < 0 || x >= size);
    return invalidRows.length === 0 && invalidColumns.length === 0;
};

const findGaps = (sortedWord: Word, orientation: Orientation) => {
    if (orientation == Orientation.Horizontal) {
        const gaps = new Array<[number, number]>();
        const row = sortedWord[0].row;
        const minCol = sortedWord[0].column;
        const maxCol = sortedWord[sortedWord.length - 1].column;
        for (let i = minCol, pos = 0; i <= maxCol; i++) {
            const char = sortedWord[pos];
            if (char.column == i) {
                pos++;
            } else {
                gaps.push([row, i]);
            }
        }
        return gaps;
    } else if (orientation == Orientation.Vertical) {
        const gaps = new Array<[number, number]>();
        const col = sortedWord[0].column;
        const minRow = sortedWord[0].row;
        const maxRow = sortedWord[sortedWord.length - 1].row;
        for (let i = minRow, pos = 0; i <= maxRow; i++) {
            const char = sortedWord[pos];
            if (char.row == i) {
                pos++;
            } else {
                gaps.push([i, col]);
            }
        }
        return gaps;
    } else {
        throw new Error('cannot find gaps for this Orientation');
    }
};

const mergeSortedWords = (word1: Word, word2: Word, orientation: Orientation) => {
    const word: Word = [];
    let idx1 = 0, idx2 = 0;
    while (idx1 < word1.length || idx2 < word2.length) {
        if (idx1 < word1.length && idx2 < word2.length) {
            const char1 = word1[idx1], char2 = word2[idx2];
            if (orientation === Orientation.Horizontal) {
                if (char1.column < char2.column) {
                    word.push(char1);
                    idx1++;
                } else {
                    word.push(char2);
                    idx2++;
                }
            } else if (orientation === Orientation.Vertical) {
                if (char1.row < char2.row) {
                    word.push(char1);
                    idx1++;
                } else {
                    word.push(char2);
                    idx2++;
                }
            } else {
                throw new Error('incompatible words');
            }
        } else if (idx1 < word1.length) {
            word.push(word1[idx1]);
            idx1++;
        } else if (idx2 < word2.length) {
            word.push(word2[idx2]);
            idx2++;
        }
    }
    return word;
};

interface CellWords {
    horizontal: Word | undefined,
    vertical: Word | undefined,
}

export class Board {
    private cells: Cell[][];
    readonly size = 15;
    private wordsPerCell: CellWords[][];
    private completelyEmpty: boolean;

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

        this.completelyEmpty = true;
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

    private checkIfCellsAreEmpty(word: Word) {
        for (const char of word) {
            if (this.cells[char.row][char.column].isFilled()) {
                return false;
            }
        }
        return true;
    }

    calculatePoints(word: Word): number {
        let points = 0;
        let doubleWord = 0, tripleWord = 0;
        for (const char of word) {
            const cell = this.cells[char.row][char.column];
            const cellType = cell.type;
            const tilePoints = char.tile.points;
            switch (cellType) {
            case CellType.Regular: {
                points += Math.max(0, tilePoints);
                break;
            }
            case CellType.DoubleLetter: {
                points += Math.max(0, tilePoints) * 2;
                break;
            }
            case CellType.TripleLetter: {
                points += Math.max(0, tilePoints) * 3;
                break;
            }
            case CellType.DoubleWord: {
                points += Math.max(0, tilePoints);
                if (tilePoints >= 0) doubleWord++;
                break;
            }
            case CellType.TripleWord: {
                points += Math.max(0, tilePoints);
                if (tilePoints >= 0) tripleWord++;
                break; 
            }
            case CellType.Center: {
                points += Math.max(0, tilePoints);
                if (tilePoints >= 0) doubleWord++;
                break;
            }
            }
        }
        while (doubleWord > 0) {
            points *= 2;
            doubleWord--;
        }
        while (tripleWord > 0) {
            points *= 3;
            tripleWord--;
        }
        let newCount = 0;
        for (const char of word) {
            if (char.tile.points >= 0) {
                newCount++;
            }
        }
        if (newCount == 7) {
            points += 50;
        }
        return points;
    }

    putWord(word: Word): [Word, Board] {
        // TODO: Add handling for erroneous placements
        if (word.length === 0) {
            throw new Error('word must have non-zero length');
        }
        if (!hasValidIndices(word, this.size)) {
            throw new Error('invalid indices in word');
        }
        if (!this.checkIfCellsAreEmpty(word)) {
            throw new Error('tiles placed on cells already occupied');
        }
        const orientation = wordOrientation(word, this.size);
        if (orientation === Orientation.Horizontal) {
            const row = word[0].row;
            const sortedPartialWord = word.slice().sort((a, b) => a.column - b.column);
            const minCol = sortedPartialWord[0].column;
            const maxCol = sortedPartialWord[sortedPartialWord.length - 1].column;

            if (this.completelyEmpty && (minCol != 7 || row != 7)) {
                throw new Error('First word must begin at center');
            }

            const hasLeft = minCol > 0 && this.cells[row][minCol - 1].isFilled();
            const hasRight = maxCol < this.size - 1 && this.cells[row][maxCol + 1].isFilled();

            let leftOrientation = Orientation.None, rightOrientation = Orientation.None;
            if (hasLeft) {
                leftOrientation = this.wordsPerCell[row][minCol - 1].horizontal === undefined ? Orientation.Vertical : Orientation.Horizontal;
            }
            if (hasRight) {
                rightOrientation = this.wordsPerCell[row][maxCol + 1].horizontal === undefined ? Orientation.Vertical : Orientation.Horizontal;
            }

            const gaps = findGaps(sortedPartialWord, orientation);
            let sortedWord: Word;
            if (gaps.length !== 0) {
                const wordFromGap: Word = [];
                for (const [row, column] of gaps) {
                    if (!this.cells[row][column].isFilled()) {
                        throw new Error('unfilled gaps in word');
                    } else {
                        const value = this.cells[row][column].value;
                        if (value !== undefined) {
                            wordFromGap.push({
                                row: row,
                                column: column,
                                tile: value.negated()
                            });
                        }
                    }
                }
                sortedWord = mergeSortedWords(sortedPartialWord, wordFromGap, orientation);
            } else {
                sortedWord = sortedPartialWord;
            }

            if (!hasLeft && !hasRight && gaps.length === 0 && !this.completelyEmpty) {
                throw new Error('word must be flanked by some other word');
            }

            let startCol = minCol, endCol = maxCol;
            if (hasLeft) {
                if (leftOrientation === Orientation.Horizontal) {
                    const word = this.wordsPerCell[row][minCol - 1].horizontal;
                    if (word !== undefined) {
                        for (let i = word.length - 1; i >= 0; i--) {
                            sortedWord.unshift(negatedTilePosition(word[i]));
                        }
                        startCol = word[0].column;
                    }
                } else {
                    const tile = this.cells[row][minCol - 1].value;
                    if (tile !== undefined) {
                        sortedWord.unshift({
                            row: row,
                            column: minCol - 1,
                            tile: tile.negated()
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
                            sortedWord.push(negatedTilePosition(word[i]));
                        }
                        endCol = word[word.length - 1].column;
                    }
                } else {
                    const tile = this.cells[row][maxCol + 1].value;
                    if (tile !== undefined) {
                        sortedWord.push({
                            row: row,
                            column: maxCol + 1,
                            tile: tile.negated()
                        });
                    }
                    endCol++;
                }
            }

            const newBoard = this.clone();
            for (const char of sortedWord) {
                newBoard.cells[char.row][char.column] = new Cell(newBoard.cells[char.row][char.column].type).putTile(char.tile);
            }
            for (let i = startCol; i <= endCol; i++) {
                newBoard.wordsPerCell[row][i].horizontal = sortedWord;
            }

            newBoard.completelyEmpty = false;
            return [sortedWord, newBoard];
        } else if (orientation === Orientation.Vertical) {
            const col = word[0].column;
            const sortedPartialWord = word.slice().sort((a, b) => a.row - b.row);
            const minRow = sortedPartialWord[0].row;
            const maxRow = sortedPartialWord[sortedPartialWord.length - 1].row;

            if (this.completelyEmpty && (minRow != 7 || col != 7)) {
                throw new Error('First word must begin at center');
            }

            const hasTop = minRow > 0 && this.cells[minRow - 1][col].isFilled();
            const hasBottom = maxRow < this.size - 1 && this.cells[maxRow + 1][col].isFilled();

            let topOrientation = Orientation.None, bottomOrientation = Orientation.None;
            if (hasTop) {
                topOrientation = this.wordsPerCell[minRow - 1][col].vertical === undefined ? Orientation.Horizontal : Orientation.Vertical;
            }
            if (hasBottom) {
                bottomOrientation = this.wordsPerCell[maxRow + 1][col].vertical === undefined ? Orientation.Horizontal : Orientation.Vertical;
            }

            const gaps = findGaps(sortedPartialWord, orientation);
            let sortedWord: Word;
            if (gaps.length !== 0) {
                const wordFromGap: Word = [];
                for (const [row, column] of gaps) {
                    if (!this.cells[row][column].isFilled()) {
                        throw new Error('unfilled gaps in word');
                    } else {
                        const value = this.cells[row][column].value;
                        if (value !== undefined) {
                            wordFromGap.push({
                                row: row,
                                column: column,
                                tile: value.negated()
                            });
                        }
                    }
                }
                sortedWord = mergeSortedWords(sortedPartialWord, wordFromGap, orientation);
            } else {
                sortedWord = sortedPartialWord;
            }

            if (!hasTop && !hasBottom && gaps.length === 0 && !this.completelyEmpty) {
                throw new Error('word must be flanked by some other word');
            }

            let startRow = minRow, endRow = maxRow;
            if (hasTop) {
                if (topOrientation === Orientation.Vertical) {
                    const word = this.wordsPerCell[minRow - 1][col].vertical;
                    if (word !== undefined) {
                        for (let i = word.length - 1; i >= 0; i--) {
                            sortedWord.unshift(negatedTilePosition(word[i]));
                        }
                        startRow = word[0].row;
                    }
                } else {
                    const tile = this.cells[minRow - 1][col].value;
                    if (tile !== undefined) {
                        sortedWord.unshift({
                            row: minRow - 1,
                            column: col,
                            tile: tile.negated()
                        });
                    }
                    startRow--;
                }
            }
            if (hasBottom) {
                if (bottomOrientation === Orientation.Vertical) {
                    const word = this.wordsPerCell[maxRow + 1][col].vertical;
                    if (word !== undefined) {
                        for (let i = 0; i < word.length; i++) {
                            sortedWord.push(negatedTilePosition(word[i]));
                        }
                        endRow = word[word.length - 1].row;
                    }
                } else {
                    const tile = this.cells[maxRow + 1][col].value;
                    if (tile !== undefined) {
                        sortedWord.push({
                            row: maxRow + 1,
                            column: col,
                            tile: tile.negated()
                        });
                    }
                    endRow++;
                }
            }

            const newBoard = this.clone();
            for (const char of sortedWord) {
                newBoard.cells[char.row][char.column] = new Cell(newBoard.cells[char.row][char.column].type).putTile(char.tile);
            }
            for (let i = startRow; i <= endRow; i++) {
                newBoard.wordsPerCell[i][col].vertical = sortedWord;
            }

            newBoard.completelyEmpty = false;
            return [sortedWord, newBoard];
        }
        throw new Error('unimplemented');
    }
}
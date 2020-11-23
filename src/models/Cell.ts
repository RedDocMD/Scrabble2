import Tile from './Tile';

export enum CellState {
    Empty,
    Filled
}

export enum CellType {
    Regular,
    DoubleLetter,
    DoubleWord,
    TripleLetter,
    TripleWord,
    Center
}

export class Cell {
    private _state: CellState;
    private _value: Tile | undefined;
    private _type: CellType;

    constructor(type: CellType) {
        this._type = type;
        this._state = CellState.Empty;
        this._value = undefined;
    }

    putTile(tile: Tile): Cell {
        if (this.isFilled()) {
            throw new Error('cannot fill filled cell');
        }
        const newCell = new Cell(this._type);
        newCell._value = tile;
        newCell._state = CellState.Filled;
        return newCell;
    }

    isFilled(): boolean {
        return this._state === CellState.Filled;
    }

    removeTile(): Cell {
        if (!this.isFilled()) {
            throw new Error('cannot empty empty cell');
        }
        return new Cell(this._type);
    }

    get state(): CellState {
        return this._state;
    }

    get value(): Tile | undefined {
        return this._value;
    }

    get type(): CellType {
        return this._type;
    }
}
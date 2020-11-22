import Tile from "./Tile";

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

    putTile(tile: Tile) {
        if (this.isFilled()) {
            throw new Error('cannot fill filled cell');
        }
        let newCell = new Cell(this._type);
        newCell._value = tile;
        newCell._state = CellState.Filled;
        return newCell;
    }

    isFilled() {
        return this._state === CellState.Filled;
    }

    removeTile() {
        if (!this.isFilled()) {
            throw new Error('cannot empty empty cell');
        }
        return new Cell(this._type);
    }

    get state() {
        return this._state;
    }

    get value() {
        return this._value;
    }

    get type() {
        return this._type;
    }
}
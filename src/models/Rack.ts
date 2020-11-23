import Tile from './Tile';

export default class Rack {
    private tiles: Tile[];

    constructor() {
        this.tiles = [];
    }

    private fromTiles(tiles: Tile[]) {
        const rack = new Rack();
        rack.tiles = tiles;
        return rack;
    }

    atIndex(idx: number): Tile {
        if (idx < 0 || idx > this.tiles.length) {
            throw new Error('index out of bounds');
        } else {
            return this.tiles[idx];
        }
    }

    removeAt(idx: number): Rack {
        if (idx < 0 || idx > this.tiles.length) {
            throw new Error('index out of bounds');
        } else {
            const newTiles = this.tiles.slice();
            newTiles.splice(idx, 1);
            return this.fromTiles(newTiles);
        }
    }

    add(tiles: Tile[]): Rack {
        if (this.tiles.length + tiles.length > 7) {
            throw new Error('adding these tiles will exceed capacity of rack');
        }
        let newTiles = this.tiles.slice();
        newTiles = newTiles.concat(tiles);
        return this.fromTiles(newTiles);
    }

    swap(idx1: number, idx2: number): Rack {
        if (idx1 < 0 && idx2 < 0 && idx1 >= this.tiles.length && idx2 >= this.tiles.length) {
            throw new Error('index out of bounds');
        }
        const newTiles = this.tiles.slice();
        const tmp = newTiles[idx1];
        newTiles[idx1] = newTiles[idx2];
        newTiles[idx2] = tmp;
        return this.fromTiles(newTiles);
    }

    currentTiles(): Tile[] {
        return this.tiles.slice();
    }

    get length(): number {
        return this.tiles.length;
    }
}
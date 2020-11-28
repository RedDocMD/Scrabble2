import Rack from './Rack';
import Tile from './Tile';

export default class Player {
    readonly name: string;
    private _rack: Rack;
    private _score: number;
    readonly id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
        this._rack = new Rack();
        this._score = 0;
    }

    clone(): Player {
        const player = new Player(this.name, this.id);
        player._score = this._score;
        player._rack = this._rack;
        return player; 
    }

    get rack(): Rack {
        return this._rack.clone();
    }

    get score(): number {
        return this._score;
    }

    insertTiles(tiles: Tile[]): Player {
        const player = this.clone();
        player._rack = player._rack.add(tiles);
        return player;
    }

    removeTiles(indices: number[]): Player {
        const player = this.clone();
        for (const idx of indices) {
            player._rack = player._rack.removeAt(idx);
        }
        return player;
    }

    addPoints(points: number): Player {
        const player = this.clone();
        player._score += points;
        return player;
    }
}
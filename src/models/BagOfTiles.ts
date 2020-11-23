import Tile from './Tile';
import shuffle from 'shuffle-array';

export default class BagOfTiles {
    private tiles: Tile[];

    constructor(empty: boolean) {
        this.tiles = [];
        if (!empty) {
            for (const info of initialBagInfo) {
                for (let i = 0; i < info.count; i++) {
                    const tile = new Tile(info.point, info.letter);
                    this.tiles.push(tile);
                }
            }
        }
    }

    private fromTiles(tiles: Tile[]) {
        const bag = new BagOfTiles(false);
        bag.tiles = tiles;
        return bag;
    }

    get tileCount(): number {
        return this.tiles.length;
    }

    drawTiles(count: number): [Tile[], BagOfTiles] {
        if (count < 1 || count > 7) {
            throw new Error('can draw between 1 and 7 tiles (both inclusive)');
        }
        if (count > this.tiles.length) {
            throw new Error('insufficient tiles');
        }
        const shuffledTiles = shuffle(this.tiles);
        const returnedTiles = shuffledTiles.slice(-count);
        const remainingTiles = shuffledTiles.slice(0, shuffledTiles.length - count);
        return [
            returnedTiles,
            this.fromTiles(remainingTiles)
        ];
    }

    returnTiles(tiles: Tile[]): BagOfTiles {
        let newTiles = this.tiles.slice();
        newTiles = newTiles.concat(tiles);
        return this.fromTiles(newTiles);
    }
}

interface TileInfo {
    letter: string,
    point: number,
    count: number
}

const initialBagInfo: TileInfo[] = [
    {
        letter: 'A',
        point: 1,
        count: 9
    },
    {
        letter: 'B',
        point: 3,
        count: 2
    },
    {
        letter: 'C',
        point: 3,
        count: 2
    },
    {
        letter: 'D',
        point: 2,
        count: 4
    },
    {
        letter: 'E',
        point: 1,
        count: 12
    },
    {
        letter: 'F',
        point: 4,
        count: 2
    },
    {
        letter: 'G',
        point: 2,
        count: 3
    },
    {
        letter: 'H',
        point: 4,
        count: 2
    },
    {
        letter: 'I',
        point: 1,
        count: 9
    },
    {
        letter: 'J',
        point: 8,
        count: 1
    },
    {
        letter: 'K',
        point: 5,
        count: 1
    },
    {
        letter: 'L',
        point: 1,
        count: 4
    },
    {
        letter: 'M',
        point: 3,
        count: 2,
    },
    {
        letter: 'N',
        point: 1,
        count: 6
    },
    {
        letter: 'O',
        point: 1,
        count: 8
    },
    {
        letter: 'P',
        point: 3,
        count: 2
    },
    {
        letter: 'Q',
        point: 10,
        count: 1
    },
    {
        letter: 'R',
        point: 1,
        count: 6
    },
    {
        letter: 'S',
        point: 1,
        count: 4
    },
    {
        letter: 'T',
        point: 1,
        count: 6
    },
    {
        letter: 'U',
        point: 1,
        count: 4
    },
    {
        letter: 'V',
        point: 4,
        count: 2
    },
    {
        letter: 'W',
        point: 4,
        count: 2
    },
    {
        letter: 'X',
        point: 8,
        count: 1
    },
    {
        letter: 'Y',
        point: 4,
        count: 2
    },
    {
        letter: 'Z',
        point: 10,
        count: 1
    },
    {
        letter: ' ',
        point: 0,
        count: 2
    }
];
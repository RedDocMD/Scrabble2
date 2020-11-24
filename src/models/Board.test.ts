import { Board, Word } from './Board';
import Tile from './Tile';

test('Empty board', () => {
    const board = new Board();
    expect(board.size).toBe(15);
    for (let i = 0; i < board.size; i++) {
        for (let j = 0; j < board.size; j++) {
            expect(board.getCell(i, j).isFilled()).toBe(false);
        }
    }
});

test('First word from center', () => {
    const board = new Board();
    const givenWord: Word = [
        { tile: new Tile(4, 'H'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 7, column: 8 },
        { tile: new Tile(1, 'L'), row: 7, column: 9 },
        { tile: new Tile(1, 'L'), row: 7, column: 10 },
        { tile: new Tile(1, 'O'), row: 7, column: 11 },
    ];
    const [finalWord, finalBoard] = board.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(givenWord.length);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(4, 'H'), row: 7, column: 7 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(1, 'E'), row: 7, column: 8 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(1, 'L'), row: 7, column: 9 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(1, 'L'), row: 7, column: 10 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(1, 'O'), row: 7, column: 11 });
});

test('Left horizontal', () => {
    const board = new Board();
    const leftWord: Word = [
        { tile: new Tile(4, 'W'), row: 7, column: 7 },
        { tile: new Tile(1, 'I'), row: 7, column: 8 },
        { tile: new Tile(2, 'N'), row: 7, column: 9 },
    ];
    const [firstWord, interimBoard] = board.putWord(leftWord);
    expect(leftWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(1, 'T'), row: 7, column: 10 },
        { tile: new Tile(1, 'E'), row: 7, column: 11 },
        { tile: new Tile(1, 'R'), row: 7, column: 12 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(6);
    expect(givenWord.length).toEqual(3);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(4, 'W'), row: 7, column: 7 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(1, 'I'), row: 7, column: 8 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(2, 'N'), row: 7, column: 9 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(1, 'T'), row: 7, column: 10 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(1, 'E'), row: 7, column: 11 });
    expect(finalWord[5]).toStrictEqual({ tile: new Tile(1, 'R'), row: 7, column: 12 });
});

test('Right horizontal', () => {
    const board = new Board();
    const rightWord: Word = [
        { tile: new Tile(4, 'V'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 7, column: 8 },
        { tile: new Tile(2, 'T'), row: 7, column: 9 },
    ];
    const [firstWord, interimBoard] = board.putWord(rightWord);
    expect(rightWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(3, 'C'), row: 7, column: 5 },
        { tile: new Tile(1, 'U'), row: 7, column: 6 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(5);
    expect(givenWord.length).toEqual(2);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(3, 'C'), row: 7, column: 5 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(1, 'U'), row: 7, column: 6 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(4, 'V'), row: 7, column: 7 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(1, 'E'), row: 7, column: 8 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(2, 'T'), row: 7, column: 9 });
});
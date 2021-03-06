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

test('Horizontal, First word from center', () => {
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

test('Horizontal, Left horizontal', () => {
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
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(-1, 'W'), row: 7, column: 7 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(-1, 'I'), row: 7, column: 8 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(-1, 'N'), row: 7, column: 9 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(1, 'T'), row: 7, column: 10 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(1, 'E'), row: 7, column: 11 });
    expect(finalWord[5]).toStrictEqual({ tile: new Tile(1, 'R'), row: 7, column: 12 });
});

test('Horizontal, Right horizontal', () => {
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
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(-1, 'V'), row: 7, column: 7 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(-1, 'E'), row: 7, column: 8 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(-1, 'T'), row: 7, column: 9 });
});

test('Horizontal, Left vertical', () => {
    const board = new Board();
    const leftWord: Word = [
        { tile: new Tile(4, 'W'), row: 7, column: 7 },
        { tile: new Tile(1, 'I'), row: 8, column: 7 },
        { tile: new Tile(2, 'N'), row: 9, column: 7 },
    ];
    const [firstWord, interimBoard] = board.putWord(leftWord);
    expect(leftWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(1, 'E'), row: 9, column: 8 },
        { tile: new Tile(1, 'R'), row: 9, column: 9 },
        { tile: new Tile(2, 'D'), row: 9, column: 10 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(4);
    expect(givenWord.length).toEqual(3);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(-1, 'N'), row: 9, column: 7 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(1, 'E'), row: 9, column: 8 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(1, 'R'), row: 9, column: 9 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(2, 'D'), row: 9, column: 10 });
});

test('Horizontal, Right vertical', () => {
    const board = new Board();
    const rightWord: Word = [
        { tile: new Tile(4, 'V'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 8, column: 7 },
        { tile: new Tile(2, 'T'), row: 9, column: 7 },
    ];
    const [firstWord, interimBoard] = board.putWord(rightWord);
    expect(rightWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(3, 'C'), row: 8, column: 5 },
        { tile: new Tile(1, 'U'), row: 8, column: 6 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(3);
    expect(givenWord.length).toEqual(2);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(3, 'C'), row: 8, column: 5 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(1, 'U'), row: 8, column: 6 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(-1, 'E'), row: 8, column: 7 });
});

test('Horizontal, Crossing vertical', () => {
    const board = new Board();
    const verticalWord: Word = [
        { tile: new Tile(4, 'V'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 8, column: 7 },
        { tile: new Tile(2, 'T'), row: 9, column: 7 },
    ];
    const [firstWord, interimBoard] = board.putWord(verticalWord);
    expect(verticalWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(4, 'V'), row: 8, column: 6 },
        { tile: new Tile(2, 'T'), row: 8, column: 8 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(3);
    expect(givenWord.length).toEqual(2);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(4, 'V'), row: 8, column: 6 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(-1, 'E'), row: 8, column: 7 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(2, 'T'), row: 8, column: 8 });
});

test('Horizontal, Not touching anything else', () => {
    const board = new Board();
    const rightWord: Word = [
        { tile: new Tile(4, 'V'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 7, column: 8 },
        { tile: new Tile(2, 'T'), row: 7, column: 9 },
    ];
    const [firstWord, interimBoard] = board.putWord(rightWord);
    expect(rightWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(3, 'C'), row: 11, column: 5 },
        { tile: new Tile(1, 'U'), row: 11, column: 6 },
        { tile: new Tile(1, 'T'), row: 11, column: 7 },
        { tile: new Tile(1, 'E'), row: 11, column: 8 },
    ];
    expect(() => interimBoard.putWord(givenWord)).toThrow();
});

test('Vertical, First word from center', () => {
    const board = new Board();
    const givenWord: Word = [
        { tile: new Tile(4, 'H'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 8, column: 7 },
        { tile: new Tile(1, 'L'), row: 9, column: 7 },
        { tile: new Tile(1, 'L'), row: 10, column: 7 },
        { tile: new Tile(1, 'O'), row: 11, column: 7 },
    ];
    const [finalWord, finalBoard] = board.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(givenWord.length);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(4, 'H'), row: 7, column: 7 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(1, 'E'), row: 8, column: 7 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(1, 'L'), row: 9, column: 7 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(1, 'L'), row: 10, column: 7 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(1, 'O'), row: 11, column: 7 });
});

test('Vertical, Top vertical', () => {
    const board = new Board();
    const topWord: Word = [
        { tile: new Tile(4, 'W'), row: 7, column: 7 },
        { tile: new Tile(1, 'I'), row: 8, column: 7 },
        { tile: new Tile(2, 'N'), row: 9, column: 7 },
    ];
    const [firstWord, interimBoard] = board.putWord(topWord);
    expect(topWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(1, 'T'), row: 10, column: 7 },
        { tile: new Tile(1, 'E'), row: 11, column: 7 },
        { tile: new Tile(1, 'R'), row: 12, column: 7 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(6);
    expect(givenWord.length).toEqual(3);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(-1, 'W'), row: 7, column: 7 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(-1, 'I'), row: 8, column: 7 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(-1, 'N'), row: 9, column: 7 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(1, 'T'), row: 10, column: 7 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(1, 'E'), row: 11, column: 7 });
    expect(finalWord[5]).toStrictEqual({ tile: new Tile(1, 'R'), row: 12, column: 7 });
});

test('Vertical, Bottom vertical', () => {
    const board = new Board();
    const bottomWord: Word = [
        { tile: new Tile(4, 'V'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 8, column: 7 },
        { tile: new Tile(2, 'T'), row: 9, column: 7 },
    ];
    const [firstWord, interimBoard] = board.putWord(bottomWord);
    expect(bottomWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(3, 'C'), row: 5, column: 7 },
        { tile: new Tile(1, 'U'), row: 6, column: 7 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(5);
    expect(givenWord.length).toEqual(2);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(3, 'C'), row: 5, column: 7 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(1, 'U'), row: 6, column: 7 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(-1, 'V'), row: 7, column: 7 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(-1, 'E'), row: 8, column: 7 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(-1, 'T'), row: 9, column: 7 });
});

test('Vertical, Top horizontal', () => {
    const board = new Board();
    const topWord: Word = [
        { tile: new Tile(4, 'W'), row: 7, column: 7 },
        { tile: new Tile(1, 'I'), row: 7, column: 8 },
        { tile: new Tile(2, 'N'), row: 7, column: 9 },
    ];
    const [firstWord, interimBoard] = board.putWord(topWord);
    expect(topWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(2, 'N'), row: 8, column: 8 },
        { tile: new Tile(1, 'T'), row: 9, column: 8 },
        { tile: new Tile(1, 'E'), row: 10, column: 8 },
        { tile: new Tile(1, 'R'), row: 11, column: 8 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(5);
    expect(givenWord.length).toEqual(4);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(-1, 'I'), row: 7, column: 8 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(2, 'N'), row: 8, column: 8 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(1, 'T'), row: 9, column: 8 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(1, 'E'), row: 10, column: 8 });
    expect(finalWord[4]).toStrictEqual({ tile: new Tile(1, 'R'), row: 11, column: 8 });
});

test('Vertical, Bottom horizontal', () => {
    const board = new Board();
    const bottomWord: Word = [
        { tile: new Tile(4, 'V'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 7, column: 8 },
        { tile: new Tile(2, 'T'), row: 7, column: 9 },
    ];
    const [firstWord, interimBoard] = board.putWord(bottomWord);
    expect(bottomWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(3, 'C'), row: 4, column: 8 },
        { tile: new Tile(1, 'U'), row: 5, column: 8 },
        { tile: new Tile(2, 'T'), row: 6, column: 8 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(4);
    expect(givenWord.length).toEqual(3);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(3, 'C'), row: 4, column: 8 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(1, 'U'), row: 5, column: 8 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(2, 'T'), row: 6, column: 8 });
    expect(finalWord[3]).toStrictEqual({ tile: new Tile(-1, 'E'), row: 7, column: 8 });
});

test('Vertical, Crossing horizontal', () => {
    const board = new Board();
    const horizontalWord: Word = [
        { tile: new Tile(4, 'V'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 7, column: 8 },
        { tile: new Tile(2, 'T'), row: 7, column: 9 },
    ];
    const [firstWord, interimBoard] = board.putWord(horizontalWord);
    expect(horizontalWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(4, 'V'), row: 6, column: 8 },
        { tile: new Tile(2, 'T'), row: 8, column: 8 },
    ];
    const [finalWord, finalBoard] = interimBoard.putWord(givenWord);
    for (const char of givenWord) {
        expect(finalBoard.getCell(char.row, char.column).value).toStrictEqual(char.tile);
    }
    expect(finalWord.length).toEqual(3);
    expect(givenWord.length).toEqual(2);
    expect(finalWord[0]).toStrictEqual({ tile: new Tile(4, 'V'), row: 6, column: 8 });
    expect(finalWord[1]).toStrictEqual({ tile: new Tile(-1, 'E'), row: 7, column: 8 });
    expect(finalWord[2]).toStrictEqual({ tile: new Tile(2, 'T'), row: 8, column: 8 });
});

test('Vertical, Not touching anything else', () => {
    const board = new Board();
    const rightWord: Word = [
        { tile: new Tile(4, 'V'), row: 7, column: 7 },
        { tile: new Tile(1, 'E'), row: 8, column: 7 },
        { tile: new Tile(2, 'T'), row: 9, column: 7 },
    ];
    const [firstWord, interimBoard] = board.putWord(rightWord);
    expect(rightWord.length).toEqual(3);
    const givenWord: Word = [
        { tile: new Tile(3, 'C'), row: 5, column: 11 },
        { tile: new Tile(1, 'U'), row: 6, column: 11 },
        { tile: new Tile(1, 'T'), row: 7, column: 11 },
        { tile: new Tile(1, 'E'), row: 8, column: 11 },
    ];
    expect(() => interimBoard.putWord(givenWord)).toThrow();
});

test('First word must start at center', () => {
    const board = new Board();
    const givenWord: Word = [
        { tile: new Tile(4, 'H'), row: 7, column: 6 },
        { tile: new Tile(1, 'E'), row: 7, column: 7 },
        { tile: new Tile(1, 'L'), row: 7, column: 8 },
        { tile: new Tile(1, 'L'), row: 7, column: 9 },
        { tile: new Tile(1, 'O'), row: 7, column: 10 },
    ];
    expect(() => board.putWord(givenWord)).toThrow();
});
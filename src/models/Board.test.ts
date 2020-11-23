import { Board } from "./Board"

test('Empty board', () => {
    let board = new Board();
    expect(board.size).toBe(15);
    for (let i = 0; i < board.size; i++) {
        for (let j = 0; j < board.size; j++) {
            expect(board.getCell(i, j).isFilled()).toBe(false);
        }
    }
})
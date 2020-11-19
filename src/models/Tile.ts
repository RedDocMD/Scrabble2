export default class Tile {
    readonly points: number;
    readonly letter: string;

    constructor(thePoints: number, theLetter: string) {
        const letterRegex = new RegExp(/\w| /);
        if (thePoints < 0) {
            throw new Error("thePoints must be non-negative");
        }
        if (theLetter.length !== 1 || !letterRegex.test(theLetter)) {
            throw new Error("theLetter must be a single alphabet");
        }
        this.points = thePoints;
        this.letter = theLetter.toUpperCase();
    }
}
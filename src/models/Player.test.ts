import { EPERM } from 'constants';
import Player from './Player';

test('Player at creation', () => {
    const player = new Player('Deep', 1);
    expect(player.name).toStrictEqual('Deep');
    expect(player.id).toEqual(1);
    expect(player.score).toEqual(0);
    expect(player.rack.length).toEqual(0);
});
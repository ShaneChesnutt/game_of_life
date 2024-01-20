jest.mock('../board');

describe('Game', () => {
  const Game = require('../game');
  const Board = require('../board');
  const entityConfig = { entityPoints: [] };

  const boardMock = new Board();
  let subject;

  describe('interate', () => {
    describe('when the board has entities', () => {
      const entityPoints = [{y: 1, x: 1}];

      beforeEach(() => {
        subject = new Game(boardMock, { entityPoints });
        subject.iterate();
      });

      it('evolves the board', () => {
        expect(boardMock.evolveBoard).toHaveBeenCalled();
      });
    });

    describe('when the board has no entities', () => {
      beforeEach(() => {
        boardMock.hasNoEntities.mockReturnValue(true);
        subject = new Game(boardMock, { entityPoints: [] });
        subject.iterate();
      });

      it('evolves the board', () => {
        expect(boardMock.evolveBoard).toHaveBeenCalled();
      });

      it('sets the game state to ENDED', () => {
        expect(subject.state).toEqual(Game.GAME_STATES.END);
      });
    });
  });

  describe('hasNotEnded', () => {
    beforeEach(() => {
      subject = new Game(boardMock, entityConfig);
    });

    describe('when the game state is set to start', () => {
      it('returns true', () => {
        expect(subject.hasNotEnded()).toBe(true);
      });
    });

    describe('when the game state is set to end', () => {
      beforeEach(() => {
        subject.state = Game.GAME_STATES.END;
      });

      it('returns false', () => {
        expect(subject.hasNotEnded()).toBe(false);
      });
    });
  });

  describe('display', () => {
    const boardShowValue = 'XXX\n';

    beforeEach(() => {
      boardMock.show.mockReturnValue(boardShowValue);
      subject = new Game(boardMock, entityConfig);
    });

    it('returns the board display', () => {
      expect(subject.display()).toEqual(boardShowValue);
    });
  });
});

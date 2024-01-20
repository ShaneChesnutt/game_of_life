describe('board', () => {
  const Board = require('../board');
  let subject;

  describe('addEntity', () => {
    const length = 3;
    const width = 3;
    const x = 1;
    const y = 1;

    beforeEach(() => {
      subject = new Board(length, width);
      expect(subject.addEntity(x, y))
    });

    it('adds an entity to the entities list', () => {
      expect(subject.entities.length).toEqual(1);
    });

    it('adds an living cell to the board', () => {
      expect(subject.show()).toMatchSnapshot();
    });
  });

  describe('evolveBoard', () => {
    const length = 5;
    const width = 5;

    let watchedEntity;

    beforeEach(() => {
      subject = new Board(length, width);
    });

    describe('underpopulation', () => {
      describe('when an entity has less than two living neighbors', () => {
        beforeEach(() => {
          subject.addEntity(3, 3);
          watchedEntity = subject.entities[0];
          subject.evolveBoard();
        });

        it('removes the entity from the entities list', () => {
          expect(subject.entities).not.toContainEqual(
            { y: 3, x: 3, state: 'ALIVE' }
          );
        });

        it('removes the living cell from the board', () => {
          expect(subject.grid[3][3]).toEqual(Board.CELL_STATE_SYMBOLS.DEAD)
        });
      });
    });

    describe('overpopulation', () => {
      describe('when an entity has more than 3 living neighbors', () => {
        beforeEach(() => {
          subject.addEntity(3, 3);
          subject.addEntity(2, 2);
          subject.addEntity(2, 4);
          subject.addEntity(4, 2);
          subject.addEntity(4, 4);
          watchedEntity = subject.entities[0];
          subject.evolveBoard();
        });

        it('removes the entity from the entities list', () => {
          expect(subject.entities).not.toContainEqual(
            { y: 3, x: 3, state: 'ALIVE' }
          );
        });

        it('removes the living cell from the board', () => {
          expect(subject.grid[3][3]).toEqual(Board.CELL_STATE_SYMBOLS.DEAD)
        });
      });
    });

    describe('stable popluation', () => {
      describe('when an entity has exaclty 3 living neighbors', () => {
        beforeEach(() => {
          subject.addEntity(3, 3);
          subject.addEntity(3, 2);
          subject.addEntity(2, 3);
          subject.addEntity(2, 2);
          watchedEntity = subject.entities[0];
          subject.evolveBoard();
        });

        it('does not remove the entity from the entities list', () => {
          expect(subject.entities).toContainEqual(
            { y: 3, x: 3, state: 'ALIVE' }
          );
        });

        it('does not update grid to have a dead ', () => {
          expect(subject.grid[3][3]).toEqual(Board.CELL_STATE_SYMBOLS.ALIVE)
        });
      });
    });

    describe('population growth', () => {
      describe('when an emtpy grid cell has exaclty 3 living neighbors', () => {
        beforeEach(() => {
          subject.addEntity(2, 2);
          subject.addEntity(2, 4);
          subject.addEntity(3, 3);
          subject.evolveBoard();
        });

        it('adds a new entity to the entities list', () => {
          expect(subject.entities).toContainEqual(
            { y: 2, x: 3, state: 'ALIVE' }
          );
        });

        it('updates the grid to have a new living tile', () => {
          expect(subject.grid[2][3]).toEqual(Board.CELL_STATE_SYMBOLS.ALIVE);
        });
      });
    });
  });

  describe('hasNoEntities', () => {
    const length = 3;
    const width = 3;

    beforeEach(() => {
      subject = new Board(length, width);
    });

    describe('when entities is empty', () => {
      it('returns true', () => {
        expect(subject.hasNoEntities()).toBe(true);
      });
    });

    describe('when entities is not empty', () => {
      beforeEach(() => {
        expect(subject.addEntity(2, 2))
      });

      it('returns false', () => {
        expect(subject.hasNoEntities()).toBe(false);
      });
    });
  });

  describe('show', () => {
    const length = 3;
    const width = 4;

    beforeEach(() => {
      subject = new Board(length, width);
    });

    it('generates a string display of the board', () => {
      expect(subject.show()).toMatchSnapshot();
    });
  });
})

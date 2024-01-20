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

    it('adds an empty space to the board', () => {
      expect(subject.show()).toMatchSnapshot();
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

describe('Entity', () => {
  const Entity = require('../entity');
  let subject;

  const y = 5;
  const x = 5;

  beforeEach(() => {
    subject = new Entity(y, x);
  });

  describe('neighborPoints', () => {
    it('returns a list of points surrounding the entity', () => {
      expect(subject.neighborPoints()).toEqual([
        { y: y + 1, x: x - 1 },
        { y: y + 1, x: x },
        { y: y + 1, x: x + 1 },
        { y: y, x: x + 1 },
        { y: y - 1, x: x + 1},
        { y: y - 1, x: x },
        { y: y - 1, x: x - 1},
        { y: y, x: x - 1},
      ]);
    });
  });

  describe('die', () => {
    beforeEach(() => {
      subject.die();
    });

    it('sets the entity state to "DEAD"', () => {
      expect(subject.state).toEqual("DEAD");
    });
  });

  describe('isDead', () => {
    describe('when the entity state is "ALIVE"', () => {
      beforeEach(() => {
        subject.state = 'ALIVE';
      });

      it('returns false', () => {
        expect(subject.isDead()).toBe(false);
      });
    });

    describe('when the entity state is "DEAD"', () => {
      beforeEach(() => {
        subject.state = 'DEAD';
      });

      it('returns true', () => {
        expect(subject.isDead()).toBe(true);
      });
    });
  });
});
